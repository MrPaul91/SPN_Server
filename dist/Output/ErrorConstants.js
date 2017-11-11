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
    invalid_image_information: new _Output2.default("invalid_image_information", 400)

    /*
    
    password_incorrect: new Error("password_incorrect", 400),
    person_exists: new Error("person_exists", 400),
    user_exists: new Error("user_exists", 400),
    
    album_exists: new Error("album_exists", 400),
    image_exists: new Error("image_exists", 400),
    albumximage_exists: new Error("albumximage_exists", 400),
    image_updating_error: new Error("image_updating_error", 500),
    missing_information: new Error("missing_information", 400),
    invalid_person_information: new Error("invalid_person_information", 400),
    invalid_user_information: new Error("invalid_user_information", 400),
    
    invalid_album_information: new Error("invalid_album_information", 400),
    invalid_albumximage_information: new Error("invalid_albumximage_information", 400),
    
    server_error: new Error("server_error", 500),
    
    albumximage_does_not_exists: new Error("albumximage_does_not_exists", 400),
    image_does_not_exists: new Error("image_does_not_exists", 400),
    diferent_user_and_image_owner: Error("diferent_user_and_image_owner", 400)
      */
};