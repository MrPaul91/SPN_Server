import mysql from 'mysql';
import fs from 'fs';
import ErrorConstants from '../Output/ErrorConstants.js';
import MessageConstants from '../Output/MessageConstants.js';

export default class DataBaseConnection {

    constructor() {

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'SPN',
            port: 8889
        });

        this.start();
    }

    start() {
        this.connection.connect((error) => {

            if (error) {
                throw error;
            } else {
                console.log('Successful Connection');
            }
        });
    }

    async insertUser(user) {

        return new Promise((resolve, reject) => {

            this.connection.beginTransaction((error) => {

                if (error) {
                    this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                } else {

                    this.connection.query("INSERT INTO person VALUES(" + user.personId + ",'" + user.name + "','USER')", (error, result) => {

                        if (error) {
                            this.connection.rollback(() => { reject(ErrorConstants.person_exists); });
                        } else {
                            this.connection.query("INSERT INTO user VALUES('" + user.username + "','/Image/Profile/" + user.username + user.avatar.extension + "','" + user.password + "','" + user.email + "'," + user.personId + ")", (error, result) => {
                                if (error) {
                                    this.connection.rollback(() => { reject(ErrorConstants.user_exists); });
                                } else {
                                    var path = "./Image/Profile/" + user.username + user.avatar.extension;

                                    DataBaseConnection.insertFile(path, user.avatar.file, 'base64')
                                        .then(value => {
                                            this.connection.commit((error) => {
                                                if (error) {
                                                    this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                                                } else {
                                                    this.connection.end();
                                                    resolve(MessageConstants.user_created);
                                                }
                                            })
                                        })
                                        .catch(error => {
                                            this.connection.rollback(() => { reject(ErrorConstants.image_creation_error); });
                                        })

                                }
                            })

                        }
                    });

                }
            })
        });
    }

    logIn(username, password) {

        return new Promise((resolve, reject) => {

            this.connection.query("SELECT * FROM user, person WHERE user.person = person.personId AND user.username = '" + username + "'", (error, result, fields) => {

                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else if (result.length > 0) {

                    if (result[0].password == password) {
                        resolve(result[0]);
                    } else {
                        reject(ErrorConstants.password_incorrect);
                    }
                } else {

                    reject(ErrorConstants.username_does_not_exists);
                }
            })
        });

    }

    createSession(session) {
        return new Promise((resolve, reject) => {

            this.connection.query("INSERT INTO session VALUES('" + session.sessionId + "', '" + session.status + "', '" + session.IP + "', '" + session.user.personId + "')", (error, result, fields) => {

                if (error) {
                    reject(ErrorConstants.session_exists);
                } else {
                    resolve(MessageConstants.session_created);
                }
            });
        });
    }

    getSession(sessionId) {
        return new Promise((resolve, reject) => {

            this.connection.query("SELECT * FROM user, session, person WHERE user.person = session.user AND user.person = person.personId AND session.sessionId = '" + sessionId + "'", (error, result, fields) => {
                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject(ErrorConstants.session_does_not_exists);
                }
            });
        })
    }

    insertImage(image) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO image VALUES('" + image.idImage + "','./DAO/Image/Album/" + image.idImage + image.photo.extension + "','" + image.description + "','" + image.title + "','" + image.comment + "','" + image.user.personId + "')", (error, result) => {

                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else {

                    //Insert Image in the server
                }
            });
        });
    }

    static insertFile(path, data, option) {

        return new Promise((resolve, reject) => {

            fs.writeFile(path, data, option, (error) => {

                if (error) {
                    reject(false);
                } else {
                    resolve(true);
                }
            })
        });
    }


}