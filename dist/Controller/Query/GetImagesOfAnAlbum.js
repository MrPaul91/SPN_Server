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

var _Album = require('../../Model/Album.js');

var _Album2 = _interopRequireDefault(_Album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Bien
exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var username, sessionId, albumId, IP, newSession, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        username = req.body.username;
                        sessionId = req.body.sessionId;
                        albumId = req.body.albumId;
                        IP = _requestIp2.default.getClientIp(req);
                        _context.next = 6;
                        return _Session2.default.search(sessionId);

                    case 6:
                        newSession = _context.sent;

                        if (!(username && sessionId && albumId)) {
                            _context.next = 22;
                            break;
                        }

                        if (newSession.error) {
                            _context.next = 19;
                            break;
                        }

                        if (!newSession.validateIP(IP, username)) {
                            _context.next = 16;
                            break;
                        }

                        _context.next = 12;
                        return _Album2.default.getAlbumImages(albumId);

                    case 12:
                        result = _context.sent;

                        res.status(result.message.statusCode).send((0, _stringify2.default)({ "message": result.message.name, "Images": result.Images }));

                        _context.next = 17;
                        break;

                    case 16:
                        res.status(_ErrorConstants2.default.invalid_session.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.invalid_session.name }));

                    case 17:
                        _context.next = 20;
                        break;

                    case 19:
                        res.status(newSession.error.statusCode).send((0, _stringify2.default)({ "error": newSession.error.name }));

                    case 20:
                        _context.next = 23;
                        break;

                    case 22:
                        res.status(_ErrorConstants2.default.missing_information.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.missing_information.name }));

                    case 23:
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