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

var _Person = require('../../Model/Person.js');

var _Person2 = _interopRequireDefault(_Person);

var _User = require('../../Model/User.js');

var _User2 = _interopRequireDefault(_User);

var _ErrorConstants = require('../../Output/ErrorConstants.js');

var _ErrorConstants2 = _interopRequireDefault(_ErrorConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var personId, name, username, avatar, password, email, newUser, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        console.log(req.body);
                        personId = req.body.personId;
                        name = req.body.name;
                        username = req.body.username;
                        avatar = req.body.avatar;
                        password = req.body.password;
                        email = req.body.email;
                        newUser = new _User2.default(personId, name, username, avatar, password, email);

                        if (!(newUser.validatePerson() && newUser.validateUser())) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 11;
                        return newUser.insertUser();

                    case 11:
                        result = _context.sent;


                        if (!result.error) {
                            res.status(result.message.statusCode).send((0, _stringify2.default)({ "message": result.message.name }));
                        } else {
                            res.status(result.error.statusCode).send((0, _stringify2.default)({ "error": result.error.name }));
                        }
                        _context.next = 19;
                        break;

                    case 15:
                        _context.next = 17;
                        return (0, _stringify2.default)({ 'error': [_ErrorConstants2.default.missing_information.name] });

                    case 17:
                        result = _context.sent;

                        res.status(_ErrorConstants2.default.missing_information.statusCode).send(result);

                    case 19:
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