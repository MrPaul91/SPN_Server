import mysql from 'mysql';
import fs from 'fs';
import ErrorConstants from '../Output/ErrorConstants.js';
import MessageConstants from '../Output/MessageConstants.js';

export default class DataBaseConnection {

    //Bien
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

    //Bien
    start() {
        this.connection.connect((error) => {

            if (error) {
                throw error;
            } else {
                console.log('Successful Connection');
            }
        });
    }

    //Bien
    async insertUser(user) {

        return new Promise((resolve, reject) => {

            this.connection.beginTransaction((error) => {

                if (error) {
                    this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                } else {

                    var q1 = "INSERT INTO person(personId, name, typeOfPerson) VALUES ('" + user.personId + "','" + user.name + "','USER')";
                    this.connection.query(q1, (error, result) => {

                        if (error) {
                            this.connection.rollback(() => { reject(ErrorConstants.person_exists); });
                        } else {

                            var q2 = "INSERT INTO user(username, avatar, password, email, rol, person) VALUES ('" + user.username + "','/Image/Profile/" + user.username + user.avatar.extension + "','" + user.password + "','" + user.email + "','" + user.rol + "', " + user.personId + ")";
                            this.connection.query(q2, (error, result) => {
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

    //Bien
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

    //Bien
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

    //Bien
    createSession(session) {
        return new Promise((resolve, reject) => {
            var q = "INSERT INTO session(sessionId, status, ip, user) VALUES ('" + session.sessionId + "','" + session.status + "','" + session.IP + "','" + session.user.personId + "')";
            this.connection.query(q, (error, result, fields) => {

                if (error) {
                    reject(ErrorConstants.session_exists);
                } else {
                    resolve(MessageConstants.session_created);
                }
            });
        });
    }

    //Bien
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

    //Bien
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

                                            resolve({ "message": MessageConstants.image_created, "idImage": result.insertId });
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

    insertAlbum(album) {

        return new Promise((resolve, reject) => {

            var query = "INSERT INTO album(name, description, user) VALUES ('" + album.name + "','" + album.description + "','" + album.user.personId + "')";
            this.connection.query(query, (error, result) => {

                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else {
                    resolve({ "message": MessageConstants.album_created, "albumId": result.insertId })
                }
            });
        });
    }

    insertAlbumxImage(image, album) {

        return new Promise((resolve, reject) => {
            this.connection.beginTransaction((error) => {

                if (error) {
                    this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                } else {

                    var query = "SELECT MAX(orderNumber) AS orderNumber FROM albumximage WHERE album='" + album + "'";
                    this.connection.query(query, (error, result, fields) => {

                        if (error || result.length == 0) {
                            this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                        } else {

                            var orderNumber = result[0].orderNumber + 1;

                            var query = "INSERT INTO albumximage(orderNumber, image, album) VALUES ('" + orderNumber + "','" + image + "','" + album + "')";
                            this.connection.query(query, (error, result) => {

                                if (error) {
                                    this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                                } else {
                                    this.connection.commit((error) => {
                                        if (error) {
                                            this.connection.rollback(() => { reject(ErrorConstants.data_base_error); });
                                        } else {
                                            this.connection.end();
                                            resolve({ "message": MessageConstants.albumximage_created });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    copyImage(idImage, albumId, user) {

    }

    //Bien
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

    //Bien
    getAlbumImages(albumId) {

        return new Promise((resolve, reject) => {

            //var q = "SELECT idImage, directory, extension, description, title, comment, user.username, orderNumber FROM user INNER JOIN (image INNER JOIN albumximage ON image.idImage = albumximage.image) ON image.user = user.person WHERE album = '" + albumId + "' ORDER BY albumximage.orderNumber ASC";
            var q = "SELECT idImage, CONCAT(directory, idImage, extension) AS imagePath, description, title, comment, user.username, orderNumber FROM user INNER JOIN (image INNER JOIN albumximage ON image.idImage = albumximage.image) ON image.user = user.person WHERE album = '" + albumId + "' ORDER BY albumximage.orderNumber ASC"
            this.connection.query(q, (error, result, fields) => {

                if (error) {
                    reject(ErrorConstants.data_base_error);
                } else {
                    resolve({ 'message': MessageConstants.images_queried, 'Images': result });
                }
            });
        });
    }

    //Bien
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