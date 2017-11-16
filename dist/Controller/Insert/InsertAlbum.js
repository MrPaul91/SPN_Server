'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _requestIp = require('request-ip');

var _requestIp2 = _interopRequireDefault(_requestIp);

var _ErrorConstants = require('../../Output/ErrorConstants.js');

var _ErrorConstants2 = _interopRequireDefault(_ErrorConstants);

var _Session = require('../../Model/Session.js');

var _Session2 = _interopRequireDefault(_Session);

var _User = require('../../Model/User.js');

var _User2 = _interopRequireDefault(_User);

var _Album = require('../../Model/Album.js');

var _Album2 = _interopRequireDefault(_Album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var name, description, username, sessionId, IP, newSession, albumOwner, newAlbum, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        name = req.body.name;
                        description = req.body.description;
                        username = req.body.username; //Session Owner

                        sessionId = req.body.sessionId;
                        IP = _requestIp2.default.getClientIp(req);
                        _context.next = 7;
                        return _Session2.default.search(sessionId);

                    case 7:
                        newSession = _context.sent;


                        console.log(req.body);

                        if (!(name && description && username && sessionId)) {
                            _context.next = 33;
                            break;
                        }

                        if (newSession.error) {
                            _context.next = 30;
                            break;
                        }

                        if (!newSession.validateIP(IP, username)) {
                            _context.next = 27;
                            break;
                        }

                        _context.next = 14;
                        return _User2.default.getUser(username);

                    case 14:
                        albumOwner = _context.sent;

                        if (albumOwner.error) {
                            _context.next = 24;
                            break;
                        }

                        newAlbum = new _Album2.default(name, description, albumOwner);
                        _context.next = 19;
                        return newAlbum.create();

                    case 19:
                        result = _context.sent;


                        console.log(result.albumId);

                        if (!result.error) {
                            res.status(result.message.statusCode).send((0, _stringify2.default)({ "message": result.message.name }));
                        } else {
                            res.status(result.error.statusCode).send((0, _stringify2.default)({ "error": result.error.name }));
                        }
                        _context.next = 25;
                        break;

                    case 24:
                        res.status(albumOwner.error.statusCode).send((0, _stringify2.default)({ "error": albumOwner.error.name }));

                    case 25:
                        _context.next = 28;
                        break;

                    case 27:
                        res.status(_ErrorConstants2.default.invalid_session.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.invalid_session.name }));

                    case 28:
                        _context.next = 31;
                        break;

                    case 30:
                        res.status(newSession.error.statusCode).send((0, _stringify2.default)({ "error": newSession.error.name }));

                    case 31:
                        _context.next = 34;
                        break;

                    case 33:
                        res.status(_ErrorConstants2.default.missing_information.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.missing_information.name }));

                    case 34:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();