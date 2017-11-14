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
                                            });
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

    getUser(username) {

        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM user,person WHERE username = '" + username + "' AND user.person = person.personId", (error, result, fields) => {

                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else {
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        reject(ErrorConstants.username_does_not_exists);
                    }
                }
            });
        })
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
            this.connection.beginTransaction((error) => {

                if (error) {
                    this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                } else {
                    var query = "INSERT INTO image(directory, extension, description, title,comment, user) VALUES ('/Image/Album/','" + image.photo.extension + "', '" + image.description + "', '" + image.title + "','" + image.comment + "', '" + image.user.personId + "')";
                    this.connection.query(query, (error, result) => {
                        if (error) {
                            this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                        } else {

                            var path = "./Image/Album/" + result.insertId + image.photo.extension;

                            DataBaseConnection.insertFile(path, image.photo.file, 'base64')
                                .then(value => {
                                    this.connection.commit((error) => {
                                        if (error) {
                                            this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                                        } else {
                                            this.connection.end();
                                            resolve(MessageConstants.image_created);
                                        }
                                    });
                                })
                                .catch(error => {
                                    this.connection.rollback(() => { reject(ErrorConstants.image_creation_error); });
                                })
                        }
                    });
                }

            });
        });
    }

    getAlbums(username) {
        return new Promise((resolve, reject) => {

            this.connection.query("SELECT albumId, name, description FROM album WHERE album.user = (SELECT user.person FROM user WHERE user.username = '" + username + "')", (error, result, fields) => {
                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else {
                    resolve({ 'message': MessageConstants.albums_queried, 'Albums': result });
                }
            })
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