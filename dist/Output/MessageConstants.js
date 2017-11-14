'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Output = require('./Output.js');

var _Output2 = _interopRequireDefault(_Output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    user_created: new _Output2.default('user_created', 200),
    album_created: new _Output2.default('album_created', 200),
    session_created: new _Output2.default('session_created', 200),
    image_created: new _Output2.default('image_created', 200),
    albumximage_created: new _Output2.default('albumximage_created', 200),
    logIn_successful: new _Output2.default('logIn_successful', 200),
    image_updated: new _Output2.default('image_updated', 200),
    albums_queried: new _Output2.default('albums_queried', 200)
};