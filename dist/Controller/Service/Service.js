'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _LogIn = require('../Query/LogIn.js');

var _LogIn2 = _interopRequireDefault(_LogIn);

var _InsertUser = require('../Insert/InsertUser.js');

var _InsertUser2 = _interopRequireDefault(_InsertUser);

var _InsertImage = require('../Insert/InsertImage.js');

var _InsertImage2 = _interopRequireDefault(_InsertImage);

var _ProfileImage = require('../Query/ProfileImage.js');

var _ProfileImage2 = _interopRequireDefault(_ProfileImage);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = function () {
    function Service() {
        (0, _classCallCheck3.default)(this, Service);

        this.app = (0, _express2.default)();
    }

    (0, _createClass3.default)(Service, [{
        key: 'start',
        value: function start() {

            this.app.use(_bodyParser2.default.json({ limit: '50mb' }));
            this.app.use((0, _cookieParser2.default)());
            this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });

            this.app.post('/LogIn', _LogIn2.default); //Bien
            this.app.post('/InsertUser', _InsertUser2.default); //Bien
            this.app.post('/InsertImage', _InsertImage2.default);
            this.app.get('/Image/Profile/:name', _ProfileImage2.default); //Bien

            this.app.listen(1337, function () {
                console.log('Listening on port 1337');
            });
        }
    }]);
    return Service;
}();

exports.default = Service;