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

var Image = function () {
    function Image(photo, description, title, comment, user) {
        (0, _classCallCheck3.default)(this, Image);

        //this.idImage;
        this.photo = photo;
        this.description = description;
        this.title = title;
        this.comment = comment;
        this.user = user;
    }

    (0, _createClass3.default)(Image, [{
        key: 'remove',
        value: function remove() {}
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'validateImage',
        value: function validateImage() {

            if (!this.user.validateUser()) {
                return false;
            } else if (!this.photo || !this.description || !this.title || !this.comment) {
                return false;
            } else if (!(this.title.length >= 5 && this.title.length <= 20 && this.comment.length > 0 && this.comment.length <= 255 && this.description.length > 0 && this.description.length <= 255)) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'setIdImage',
        set: function set(idImage) {
            this.idImage = idImage;
        }
    }, {
        key: 'setPhoto',
        set: function set(photo) {
            this.photo = photo;
        }
    }, {
        key: 'setDescription',
        set: function set(description) {
            this.description = description;
        }
    }, {
        key: 'setTitle',
        set: function set(title) {
            this.title = title;
        }
    }, {
        key: 'setComment',
        set: function set(comment) {
            this.comment = comment;
        }
    }, {
        key: 'getIdImage',
        get: function get() {
            return this.idImage;
        }
    }, {
        key: 'getPhoto',
        get: function get() {
            return this.photo;
        }
    }, {
        key: 'getDescription',
        get: function get() {
            return this.description;
        }
    }, {
        key: 'getTitle',
        get: function get() {
            return this.title;
        }
    }, {
        key: 'getComment',
        get: function get() {
            return this.comment;
        }
    }], [{
        key: 'create',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(photo, description, title, comment, user) {
                var db, newImage, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                db = new _DataBaseConnection2.default();
                                newImage = new Image(photo, description, title, comment, user);

                                if (!newImage.validateImage()) {
                                    _context.next = 15;
                                    break;
                                }

                                _context.prev = 3;
                                _context.next = 6;
                                return db.insertImage(newImage);

                            case 6:
                                result = _context.sent;
                                return _context.abrupt('return', result);

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](3);
                                return _context.abrupt('return', { 'error': _context.t0 });

                            case 13:
                                _context.next = 16;
                                break;

                            case 15:
                                return _context.abrupt('return', { 'error': _ErrorConstants2.default.invalid_image_information });

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 10]]);
            }));

            function create(_x, _x2, _x3, _x4, _x5) {
                return _ref.apply(this, arguments);
            }

            return create;
        }()
    }, {
        key: 'search',
        value: function search() {}
    }]);
    return Image;
}();

exports.default = Image;