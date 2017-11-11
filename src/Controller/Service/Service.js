import express from 'express';
import bodyParser from 'body-parser';
import LogIn from '../Query/LogIn.js';
import InsertUser from '../Insert/InsertUser.js';
import InsertImage from '../Insert/InsertImage.js';
import ProfileImage from '../Query/ProfileImage.js'
import cookieParser from 'cookie-parser';

export default class Service {

    constructor() {
        this.app = express();
    }

    start() {

        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(cookieParser());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.post('/LogIn', LogIn); //Bien
        this.app.post('/InsertUser', InsertUser); //Bien
        this.app.post('/InsertImage', InsertImage); 
        this.app.get('/Image/Profile/:name', ProfileImage);//Bien

        this.app.listen(1337, function () {
            console.log('Listening on port 1337');
        });
    }

}