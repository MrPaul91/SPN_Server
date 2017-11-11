"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function Error(name, statusCode) {
    (0, _classCallCheck3.default)(this, Error);

    this.name = name;
    this.statusCode = statusCode;
};

exports.default = Error;