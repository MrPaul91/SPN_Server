'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _DataBaseConnection = require('../DAO/DataBaseConnection.js');

var _DataBaseConnection2 = _interopRequireDefault(_DataBaseConnection);

var _ErrorConstants = require('../Output/ErrorConstants.js');

var _ErrorConstants2 = _interopRequireDefault(_ErrorConstants);

var _User = require('../Model/User.js');

var _User2 = _interopRequireDefault(_User);

var _Person = require('../Model/Person.js');

var _Person2 = _interopRequireDefault(_Person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Session = function () {
    function Session(sessionId, status, IP, user) {
        (0, _classCallCheck3.default)(this, Session);

        this.sessionId = sessionId;
        this.status = status;
        this.IP = IP;
        this.user = user;
    }

    (0, _createClass3.default)(Session, [{
        key: 'validateSession',
        value: function validateSession() {
            if (!this.user.validateUser() || !this.user.validatePerson()) {
                return false;
            } else if (!this.sessionId || !this.status || !this.IP) {
                return false;
            } else if (!(this.sessionId.length > 0 && this.sessionId.length <= 255 && (this.status == 'online' || this.status == 'offline') && this.IP.length >= 1 && this.IP.length <= 128)) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'validateIP',
        value: function validateIP(IP, username) {

            if (this.status == 'online' && this.IP == IP && this.user.username == username) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'sessionToString',
        value: function sessionToString() {
            return { "sessionId": this.sessionId, "user": this.user.userToString() };
        }
    }, {
        key: 'getStatus',
        get: function get() {

            return this.status;
        }
    }, {
        key: 'setStatus',
        set: function set(status) {

            this.status = status;
        }
    }, {
        key: 'getSessionId',
        get: function get() {
            return this.sessionId;
        }
    }, {
        key: 'setSessionId',
        set: function set(sessionId) {
            this.sessionId = sessionId;
        }
    }, {
        key: 'getIP',
        get: function get() {
            return this.IP;
        }
    }, {
        key: 'setIP',
        set: function set(IP) {
            this.IP = IP;
        }
    }], [{
        key: 'loginSession',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username, password, IP) {
                var db, result, data, token, newUser, newSession, message;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                _context.prev = 1;
                                _context.next = 4;
                                return db.logIn(username, password);

                            case 4:
                                result = _context.sent;
                                data = {
                                    'username': result.username,
                                    'password': result.password,
                                    'IP': IP,
                                    'date': new Date().toJSON()
                                };
                                _context.next = 8;
                                return Session.createToken(data);

                            case 8:
                                token = _context.sent;
                                newUser = new _User2.default(result.personId, result.name, result.username, result.avatar, result.password, result.email);
                                newSession = new Session(token, 'online', IP, newUser);

                                if (!newSession.validateSession()) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 14;
                                return db.createSession(newSession);

                            case 14:
                                message = _context.sent;
                                return _context.abrupt('return', { 'session': newSession.sessionToString(), 'message': message });

                            case 16:
                                _context.next = 21;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context['catch'](1);
                                return _context.abrupt('return', { 'error': _context.t0 });

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 18]]);
            }));

            function loginSession(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return loginSession;
        }()
    }, {
        key: 'createToken',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                                    var cert = _fs2.default.readFileSync('private.key');
                                    _jsonwebtoken2.default.sign(data, cert, function (error, token) {

                                        if (error) {
                                            console.log("aqui");
                                            reject(_ErrorConstants2.default.server_error);
                                        } else {
                                            resolve(token);
                                        }
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function createToken(_x4) {
                return _ref2.apply(this, arguments);
            }

            return createToken;
        }()
    }, {
        key: 'search',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sessionId) {
                var db, result, newUser, newSession;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                _context3.prev = 1;
                                _context3.next = 4;
                                return db.getSession(sessionId);

                            case 4:
                                result = _context3.sent;
                                newUser = new _User2.default(result.personId, result.name, result.username, result.avatar, result.password, result.email);
                                newSession = new Session(result.sessionId, result.status, result.ip, newUser);
                                return _context3.abrupt('return', newSession);

                            case 10:
                                _context3.prev = 10;
                                _context3.t0 = _context3['catch'](1);
                                return _context3.abrupt('return', { 'error': _context3.t0 });

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 10]]);
            }));

            function search(_x5) {
                return _ref3.apply(this, arguments);
            }

            return search;
        }()
    }]);
    return Session;
}();

exports.default = Session;