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
        var username, sessionId, usernameToFind, IP, newSession, user, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        username = req.body.username; //Session Owner

                        sessionId = req.body.sessionId;
                        usernameToFind = req.body.usernameToFind;
                        IP = _requestIp2.default.getClientIp(req);
                        _context.next = 6;
                        return _Session2.default.search(sessionId);

                    case 6:
                        newSession = _context.sent;

                        if (!(username && sessionId && usernameToFind)) {
                            _context.next = 29;
                            break;
                        }

                        if (newSession.error) {
                            _context.next = 26;
                            break;
                        }

                        if (!newSession.validateIP(IP, username)) {
                            _context.next = 23;
                            break;
                        }

                        _context.next = 12;
                        return _User2.default.getUser(username);

                    case 12:
                        user = _context.sent;

                        if (!(user.rol != 'REGULAR')) {
                            _context.next = 20;
                            break;
                        }

                        _context.next = 16;
                        return _Album2.default.getAlbums(usernameToFind);

                    case 16:
                        result = _context.sent;


                        if (!result.error) {
                            res.status(result.message.statusCode).send((0, _stringify2.default)({ "message": result.message.name, "Albums": result.Albums }));
                        } else {
                            res.status(result.error.statusCode).send((0, _stringify2.default)({ "error": result.error.name }));
                        }
                        _context.next = 21;
                        break;

                    case 20:
                        res.status(_ErrorConstants2.default.user_not_authorized.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.user_not_authorized.name }));

                    case 21:
                        _context.next = 24;
                        break;

                    case 23:
                        res.status(_ErrorConstants2.default.invalid_session.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.invalid_session.name }));

                    case 24:
                        _context.next = 27;
                        break;

                    case 26:
                        res.status(newSession.error.statusCode).send((0, _stringify2.default)({ "error": newSession.error.name }));

                    case 27:
                        _context.next = 30;
                        break;

                    case 29:
                        res.status(_ErrorConstants2.default.missing_information.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.missing_information.name }));

                    case 30:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}(); //Bien