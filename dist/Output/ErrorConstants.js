"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Output = require("./Output.js");

var _Output2 = _interopRequireDefault(_Output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    missing_information: new _Output2.default("missing_information", 400),
    person_exists: new _Output2.default("person_exists", 400),
    data_base_error: new _Output2.default("data_base_error", 500),
    user_exists: new _Output2.default("user_exists", 400),
    image_creation_error: new _Output2.default("image_creation_error", 500),
    username_does_not_exists: new _Output2.default("username_does_not_exists", 400),
    password_incorrect: new _Output2.default("password_incorrect", 400),
    server_error: new _Output2.default("server_error", 500),
    session_exists: new _Output2.default("session_exists", 400),
    session_does_not_exists: new _Output2.default("session_does_not_exists", 400),
    invalid_session: new _Output2.default("invalid_session", 401),
    invalid_image_information: new _Output2.default("invalid_image_information", 400),
    user_not_authorized: new _Output2.default("user_not_authorized", 401),
    sql_injection: new _Output2.default("sql_injection", 400)

};