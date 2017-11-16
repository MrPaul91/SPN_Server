'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _DataBaseConnection = require('../DAO/DataBaseConnection.js');

var _DataBaseConnection2 = _interopRequireDefault(_DataBaseConnection);

var _ErrorConstants = require('../Output/ErrorConstants.js');

var _ErrorConstants2 = _interopRequireDefault(_ErrorConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Album = function () {
    function Album( /*albumId,*/name, description, user) {
        (0, _classCallCheck3.default)(this, Album);

        //this.albumId = albumId;
        this.name = name;
        this.description = description;
        this.user = user;
    }

    (0, _createClass3.default)(Album, [{
        key: 'create',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var db, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                _context.prev = 1;
                                _context.next = 4;
                                return db.insertAlbum(this);

                            case 4:
                                result = _context.sent;
                                return _context.abrupt('return', result);

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

            function create() {
                return _ref.apply(this, arguments);
            }

            return create;
        }()
    }], [{
        key: 'getAlbums',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(username) {
                var db, result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                _context2.prev = 1;
                                _context2.next = 4;
                                return db.getAlbums(username);

                            case 4:
                                result = _context2.sent;
                                return _context2.abrupt('return', result);

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](1);
                                return _context2.abrupt('return', { 'error': _context2.t0 });

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 8]]);
            }));

            function getAlbums(_x) {
                return _ref2.apply(this, arguments);
            }

            return getAlbums;
        }()

        //Bien

    }, {
        key: 'getAlbumImages',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(albumId) {
                var db, result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                _context3.prev = 1;
                                _context3.next = 4;
                                return db.getAlbumImages(albumId);

                            case 4:
                                result = _context3.sent;
                                return _context3.abrupt('return', result);

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](1);
                                return _context3.abrupt('return', { 'error': _context3.t0 });

                            case 11:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 8]]);
            }));

            function getAlbumImages(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getAlbumImages;
        }()
    }]);
    return Album;
}();

exports.default = Album;