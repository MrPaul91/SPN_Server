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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var photo, description, title, comment, username, sessionId, IP, newSession;
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
                        IP = _requestIp2.default.getClientIp(req);
                        ;

                        _context.next = 10;
                        return _Session2.default.search(sessionId);

                    case 10:
                        newSession = _context.sent;


                        if (photo && description && title && comment && username & sessionId && IP) {
                            if (!newSession.error) {

                                if (newSession.validateIP(IP, username)) {} else {
                                    res.status(_ErrorConstants2.default.invalid_session.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.invalid_session.name }));
                                }
                            } else {
                                res.status(newSession.error.statusCode).send((0, _stringify2.default)({ "error": newSession.error.name }));
                            }
                        } else {
                            res.status(_ErrorConstants2.default.missing_information.statusCode).send((0, _stringify2.default)({ "error": _ErrorConstants2.default.missing_information.name }));
                        }

                    case 12:
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