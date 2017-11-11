'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Person2 = require('./Person.js');

var _Person3 = _interopRequireDefault(_Person2);

var _DataBaseConnection = require('../DAO/DataBaseConnection.js');

var _DataBaseConnection2 = _interopRequireDefault(_DataBaseConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function (_Person) {
    (0, _inherits3.default)(User, _Person);

    function User(personId, name, username, avatar, password, email) {
        (0, _classCallCheck3.default)(this, User);

        var _this = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this, personId, name));

        _this.username = username;
        _this.avatar = avatar;
        _this.password = password;
        _this.email = email;
        return _this;
    }

    (0, _createClass3.default)(User, [{
        key: 'validateUser',
        value: function validateUser() {
            if (!this.username || !this.password || !this.avatar || !this.email) {
                return false;
            } else if (!(this.username.length >= 5 && this.username.length <= 20 && this.password.length >= 5 && this.password.length <= 20 && this.email.length >= 5 && this.email.length <= 20)) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'insertUser',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var db, message;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                _context.prev = 1;
                                _context.next = 4;
                                return db.insertUser(this);

                            case 4:
                                message = _context.sent;
                                return _context.abrupt('return', { 'message': message });

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);
                                return _context.abrupt('return', { 'error': _context.t0 });

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function insertUser() {
                return _ref.apply(this, arguments);
            }

            return insertUser;
        }()
    }, {
        key: 'userToString',
        value: function userToString() {
            return { "person": this.personToString(), "username": this.username, "avatar": this.avatar, "email": this.email };
        }
    }, {
        key: 'getUsername',
        get: function get() {
            return this.username;
        }
    }, {
        key: 'getAvatar',
        get: function get() {
            return this.avatar;
        }
    }, {
        key: 'getPassword',
        get: function get() {
            return this.password;
        }
    }, {
        key: 'getEmail',
        get: function get() {
            return this.email;
        }
    }, {
        key: 'getAlbumColletion',
        get: function get() {
            return this.albumCollection;
        }
    }, {
        key: 'setUsername',
        set: function set(username) {
            this.username = username;
        }
    }, {
        key: 'setAvata',
        set: function set(avatar) {
            this.avatar = avatar;
        }
    }, {
        key: 'setPassword',
        set: function set(password) {
            this.password = password;
        }
    }, {
        key: 'setEmail',
        set: function set(email) {
            this.email = email;
        }
    }, {
        key: 'setAlbumCollection',
        set: function set(albumCollection) {
            this.albumCollection = albumCollection;
        }
    }]);
    return User;
}(_Person3.default);

exports.default = User;