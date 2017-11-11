'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _DataBaseConnection = require('../DAO/DataBaseConnection.js');

var _DataBaseConnection2 = _interopRequireDefault(_DataBaseConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function () {
    function Image(idImage, photo, description, title, comment, user) {
        (0, _classCallCheck3.default)(this, Image);

        this.idImage = idImage;
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
        value: function create() {
            var db = new _DataBaseConnection2.default();
        }
    }, {
        key: 'search',
        value: function search() {}
    }]);
    return Image;
}();

exports.default = Image;