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

var _Image = require('../../Model/Image.js');

var _Image2 = _interopRequireDefault(_Image);

var _AlbumxImage = require('../../Model/AlbumxImage.js');

var _AlbumxImage2 = _interopRequireDefault(_AlbumxImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var photo, description, title, comment, username, sessionId, albumId, IP, newSession, imageOwner, result, idImage;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        photo = req.body.photo;
                        description = req.body.description;
                        title = req.body.title;
                        comment = req.body.comment;
                        username = req.body.username;
                        sessionId = req.body.sessionId;
                        albumId = req.body.albumId;
                        IP = _requestIp2.default.getClientIp(req);
                        _context.next = 10;
                        return _Session2.default.search(sessionId);

                    case 10:
                        newSession = _context.sent;

                        if (!(photo && description && title && comment && username && sessionId && albumId && IP)) {
                            _context.next = 41;
                            break;
                        }

                        if (newSession.error) {
                            _context.next = 38;
                            break;
                        }

                        if (!newSession.validateIP(IP, username)) {
                            _context.next = 35;
                            break;
                        }

                        _context.next = 16;
                        return _User2.default.getUser(username);

                    case 16:
                        imageOwner = _context.sent;

                        if (imageOwner.error) {
                            _context.next = 32;
                            break;
                        }

                        _context.next = 20;
                        return _Image2.default.create(photo, description, title, comment, imageOwner);

                    case 20:
                        result = _context.sent;

                        if (result.error) {
                            _context.next = 29;
                            break;
                        }

                        idImage = result.idImage;
                        _context.next = 25;
                        return _AlbumxImage2.default.create(idImage, albumId);

                    case 25:
                        result = _context.sent;


                        if (!result.error) {
                            res.status(result.message.statusCode).send((0, _stringify2.default)({ "message": result.message.name }));
                        } else {
                            res.status(result.error.statusCode).send((0, _stringify2.default)({ "error": result.error.name }));
                        }

                        _context.next = 30;
                        break;

                    case 29:
                        res.status(result.error.statusCode).send((0, _stringify2.default)({ "error": result.error.name }));

                    case 30:
                        _context.next = 33;
                        break;

                    case 32:
                        res.status(imageOwner.error.statusCode).send((0, _stringify2.default)({ "error": imageOwner.error.name }));

                    case 33:
                        _context.next = 36;
                        break;

                    case 35:
                        res.status(_ErrorConstants2.default.invalid_session.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.invalid_session.name }));

                    case 36:
                        _context.next = 39;
                        break;

                    case 38:
                        res.status(newSession.error.statusCode).send((0, _stringify2.default)({ "error": newSession.error.name }));

                    case 39:
                        _context.next = 42;
                        break;

                    case 41:
                        res.status(_ErrorConstants2.default.missing_information.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.missing_information.name }));

                    case 42:
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