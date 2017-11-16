'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ErrorConstants = require('../Output/ErrorConstants.js');

var _ErrorConstants2 = _interopRequireDefault(_ErrorConstants);

var _MessageConstants = require('../Output/MessageConstants.js');

var _MessageConstants2 = _interopRequireDefault(_MessageConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataBaseConnection = function () {

    //Bien
    function DataBaseConnection() {
        (0, _classCallCheck3.default)(this, DataBaseConnection);


        this.connection = _mysql2.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'SPN',
            port: 8889
        });

        this.start();
    }

    //Bien


    (0, _createClass3.default)(DataBaseConnection, [{
        key: 'start',
        value: function start() {
            this.connection.connect(function (error) {

                if (error) {
                    throw error;
                } else {
                    console.log('Successful Connection');
                }
            });
        }

        //Bien

    }, {
        key: 'insertUser',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
                var _this = this;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {

                                    _this.connection.beginTransaction(function (error) {

                                        if (error) {
                                            _this.connection.rollback(function () {
                                                reject(_ErrorConstants2.default.data_base_error);
                                            });
                                        } else {

                                            var q1 = "INSERT INTO person(personId, name, typeOfPerson) VALUES ('" + user.personId + "','" + user.name + "','USER')";
                                            _this.connection.query(q1, function (error, result) {

                                                if (error) {
                                                    _this.connection.rollback(function () {
                                                        reject(_ErrorConstants2.default.person_exists);
                                                    });
                                                } else {

                                                    var q2 = "INSERT INTO user(username, avatar, password, email, rol, person) VALUES ('" + user.username + "','/Image/Profile/" + user.username + user.avatar.extension + "','" + user.password + "','" + user.email + "','" + user.rol + "', " + user.personId + ")";
                                                    _this.connection.query(q2, function (error, result) {
                                                        if (error) {
                                                            _this.connection.rollback(function () {
                                                                reject(_ErrorConstants2.default.user_exists);
                                                            });
                                                        } else {

                                                            var path = "./Image/Profile/" + user.username + user.avatar.extension;

                                                            DataBaseConnection.insertFile(path, user.avatar.file, 'base64').then(function (value) {
                                                                _this.connection.commit(function (error) {
                                                                    if (error) {
                                                                        _this.connection.rollback(function () {
                                                                            reject(_ErrorConstants2.default.data_base_error);
                                                                        });
                                                                    } else {
                                                                        _this.connection.end();
                                                                        resolve(_MessageConstants2.default.user_created);
                                                                    }
                                                                });
                                                            }).catch(function (error) {
                                                                _this.connection.rollback(function () {
                                                                    reject(_ErrorConstants2.default.image_creation_error);
                                                                });
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function insertUser(_x) {
                return _ref.apply(this, arguments);
            }

            return insertUser;
        }()

        //Bien

    }, {
        key: 'logIn',
        value: function logIn(username, password) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {

                _this2.connection.query("SELECT * FROM user, person WHERE user.person = person.personId AND user.username = '" + username + "'", function (error, result, fields) {

                    if (error) {
                        reject(_ErrorConstants2.default.data_base_error);
                    } else if (result.length > 0) {

                        if (result[0].password == password) {
                            resolve(result[0]);
                        } else {
                            reject(_ErrorConstants2.default.password_incorrect);
                        }
                    } else {

                        reject(_ErrorConstants2.default.username_does_not_exists);
                    }
                });
            });
        }

        //Bien

    }, {
        key: 'getUser',
        value: function getUser(username) {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                _this3.connection.query("SELECT * FROM user,person WHERE username = '" + username + "' AND user.person = person.personId", function (error, result, fields) {

                    if (error) {
                        reject(_ErrorConstants2.default.data_base_error);
                    } else {
                        if (result.length > 0) {
                            resolve(result[0]);
                        } else {
                            reject(_ErrorConstants2.default.username_does_not_exists);
                        }
                    }
                });
            });
        }

        //Bien

    }, {
        key: 'createSession',
        value: function createSession(session) {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                var q = "INSERT INTO session(sessionId, status, ip, user) VALUES ('" + session.sessionId + "','" + session.status + "','" + session.IP + "','" + session.user.personId + "')";
                _this4.connection.query(q, function (error, result, fields) {

                    if (error) {
                        reject(_ErrorConstants2.default.session_exists);
                    } else {
                        resolve(_MessageConstants2.default.session_created);
                    }
                });
            });
        }

        //Bien

    }, {
        key: 'getSession',
        value: function getSession(sessionId) {
            var _this5 = this;

            return new _promise2.default(function (resolve, reject) {

                _this5.connection.query("SELECT * FROM user, session, person WHERE user.person = session.user AND user.person = person.personId AND session.sessionId = '" + sessionId + "'", function (error, result, fields) {
                    if (error) {
                        reject(_ErrorConstants2.default.data_base_error);
                    } else if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        reject(_ErrorConstants2.default.session_does_not_exists);
                    }
                });
            });
        }

        //Bien

    }, {
        key: 'insertImage',
        value: function insertImage(image) {
            var _this6 = this;

            return new _promise2.default(function (resolve, reject) {
                _this6.connection.beginTransaction(function (error) {

                    if (error) {
                        _this6.connection.rollback(function () {
                            reject(_ErrorConstants2.default.data_base_error);
                        });
                    } else {
                        var query = "INSERT INTO image(directory, extension, description, title,comment, user) VALUES ('/Image/Album/','" + image.photo.extension + "', '" + image.description + "', '" + image.title + "','" + image.comment + "', '" + image.user.personId + "')";
                        _this6.connection.query(query, function (error, result) {
                            if (error) {
                                _this6.connection.rollback(function () {
                                    reject(_ErrorConstants2.default.data_base_error);
                                });
                            } else {

                                var path = "./Image/Album/" + result.insertId + image.photo.extension;

                                DataBaseConnection.insertFile(path, image.photo.file, 'base64').then(function (value) {
                                    _this6.connection.commit(function (error) {
                                        if (error) {
                                            _this6.connection.rollback(function () {
                                                reject(_ErrorConstants2.default.data_base_error);
                                            });
                                        } else {
                                            _this6.connection.end();

                                            resolve({ "message": _MessageConstants2.default.image_created, "idImage": result.insertId });
                                        }
                                    });
                                }).catch(function (error) {
                                    _this6.connection.rollback(function () {
                                        reject(_ErrorConstants2.default.image_creation_error);
                                    });
                                });
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'insertAlbum',
        value: function insertAlbum(album) {
            var _this7 = this;

            return new _promise2.default(function (resolve, reject) {

                var query = "INSERT INTO album(name, description, user) VALUES ('" + album.name + "','" + album.description + "','" + album.user.personId + "')";
                _this7.connection.query(query, function (error, result) {

                    if (error) {
                        reject(_ErrorConstants2.default.data_base_error);
                    } else {
                        resolve({ "message": _MessageConstants2.default.album_created, "albumId": result.insertId });
                    }
                });
            });
        }
    }, {
        key: 'insertAlbumxImage',
        value: function insertAlbumxImage(image, album) {
            var _this8 = this;

            return new _promise2.default(function (resolve, reject) {
                _this8.connection.beginTransaction(function (error) {

                    if (error) {
                        _this8.connection.rollback(function () {
                            reject(_ErrorConstants2.default.data_base_error);
                        });
                    } else {

                        var query = "SELECT MAX(orderNumber) AS orderNumber FROM albumximage WHERE album='" + album + "'";
                        _this8.connection.query(query, function (error, result, fields) {

                            if (error || result.length == 0) {
                                _this8.connection.rollback(function () {
                                    reject(_ErrorConstants2.default.data_base_error);
                                });
                            } else {

                                var orderNumber = result[0].orderNumber + 1;

                                var query = "INSERT INTO albumximage(orderNumber, image, album) VALUES ('" + orderNumber + "','" + image + "','" + album + "')";
                                _this8.connection.query(query, function (error, result) {

                                    if (error) {
                                        _this8.connection.rollback(function () {
                                            reject(_ErrorConstants2.default.data_base_error);
                                        });
                                    } else {
                                        _this8.connection.commit(function (error) {
                                            if (error) {
                                                _this8.connection.rollback(function () {
                                                    reject(_ErrorConstants2.default.data_base_error);
                                                });
                                            } else {
                                                _this8.connection.end();
                                                resolve({ "message": _MessageConstants2.default.albumximage_created });
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

        //Bien

    }, {
        key: 'getAlbums',
        value: function getAlbums(username) {
            var _this9 = this;

            return new _promise2.default(function (resolve, reject) {

                _this9.connection.query("SELECT albumId, name, description FROM album WHERE album.user = (SELECT user.person FROM user WHERE user.username = '" + username + "')", function (error, result, fields) {
                    if (error) {
                        reject(_ErrorConstants2.default.data_base_error);
                    } else {
                        resolve({ 'message': _MessageConstants2.default.albums_queried, 'Albums': result });
                    }
                });
            });
        }

        //Bien

    }, {
        key: 'getAlbumImages',
        value: function getAlbumImages(albumId) {
            var _this10 = this;

            return new _promise2.default(function (resolve, reject) {

                //var q = "SELECT idImage, directory, extension, description, title, comment, user.username, orderNumber FROM user INNER JOIN (image INNER JOIN albumximage ON image.idImage = albumximage.image) ON image.user = user.person WHERE album = '" + albumId + "' ORDER BY albumximage.orderNumber ASC";
                var q = "SELECT idImage, CONCAT(directory, idImage, extension) AS imagePath, description, title, comment, user.username, orderNumber FROM user INNER JOIN (image INNER JOIN albumximage ON image.idImage = albumximage.image) ON image.user = user.person WHERE album = '" + albumId + "' ORDER BY albumximage.orderNumber ASC";
                _this10.connection.query(q, function (error, result, fields) {

                    if (error) {
                        reject(_ErrorConstants2.default.data_base_error);
                    } else {
                        resolve({ 'message': _MessageConstants2.default.images_queried, 'Images': result });
                    }
                });
            });
        }

        //Bien

    }], [{
        key: 'insertFile',
        value: function insertFile(path, data, option) {

            return new _promise2.default(function (resolve, reject) {

                _fs2.default.writeFile(path, data, option, function (error) {

                    if (error) {
                        reject(false);
                    } else {

                        resolve(true);
                    }
                });
            });
        }
    }]);
    return DataBaseConnection;
}();

exports.default = DataBaseConnection;