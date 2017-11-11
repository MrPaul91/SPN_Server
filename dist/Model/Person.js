"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = function () {
    function Person(personId, name) {
        (0, _classCallCheck3.default)(this, Person);

        this.personId = personId;
        this.name = name;
    }

    (0, _createClass3.default)(Person, [{
        key: "validatePerson",
        value: function validatePerson() {
            if (!this.personId || !this.name) {
                return false;
            } else if (!(this.personId.toString().length > 0 && this.personId.toString().length <= 10 && this.personId.toString().length > 0 && this.personId.toString().length <= 10)) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: "personToString",
        value: function personToString() {
            return { "personId": this.personId, "name": this.name };
        }
    }, {
        key: "getId",
        get: function get() {
            return this.personId;
        }
    }, {
        key: "getName",
        get: function get() {
            return this.name;
        }
    }, {
        key: "setId",
        set: function set(personId) {
            this.personId = personId;
        }
    }, {
        key: "setName",
        set: function set(name) {
            this.name = name;
        }
    }]);
    return Person;
}();

exports.default = Person;