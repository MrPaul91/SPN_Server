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

var _AlbumxImage = require('../../Model/AlbumxImage.js');

var _AlbumxImage2 = _interopRequireDefault(_AlbumxImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var username, sessionId, albumId, idImage, IP, newSession, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        username = req.body.username; //Session Owner

                        sessionId = req.body.sessionId;
                        albumId = req.body.albumId;
                        idImage = req.body.idImage;
                        IP = _requestIp2.default.getClientIp(req);


                        console.log(req.body);

                        _context.next = 8;
                        return _Session2.default.search(sessionId);

                    case 8:
                        newSession = _context.sent;

                        if (!(username && sessionId && albumId && idImage)) {
                            _context.next = 24;
                            break;
                        }

                        if (newSession.error) {
                            _context.next = 21;
                            break;
                        }

                        if (!newSession.validateIP(IP, username)) {
                            _context.next = 18;
                            break;
                        }

                        _context.next = 14;
                        return _AlbumxImage2.default.create(idImage, albumId);

                    case 14:
                        result = _context.sent;


                        if (!result.error) {
                            res.status(result.message.statusCode).send((0, _stringify2.default)({ "message": result.message.name }));
                        } else {
                            res.status(result.error.statusCode).send((0, _stringify2.default)({ "error": result.error.name }));
                        }

                        _context.next = 19;
                        break;

                    case 18:
                        res.status(_ErrorConstants2.default.invalid_session.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.invalid_session.name }));

                    case 19:
                        _context.next = 22;
                        break;

                    case 21:
                        res.status(newSession.error.statusCode).send((0, _stringify2.default)({ "error": newSession.error.name }));

                    case 22:
                        _context.next = 25;
                        break;

                    case 24:
                        res.status(_ErrorConstants2.default.missing_information.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.missing_information.name }));

                    case 25:
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