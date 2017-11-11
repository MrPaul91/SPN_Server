import jwt from 'jsonwebtoken';
import fs from 'fs';
import DataBaseConnection from '../DAO/DataBaseConnection.js';
import ErrorConstants from '../Output/ErrorConstants.js';
import User from '../Model/User.js';
import Person from '../Model/Person.js';

export default class Session {

    constructor(sessionId, status, IP, user) {
        this.sessionId = sessionId;
        this.status = status;
        this.IP = IP;
        this.user = user;
    }

    static async loginSession(username, password, IP) {
        var db = new DataBaseConnection();

        try {
            var result = await db.logIn(username, password);
            var data = {
                'username': result.username,
                'password': result.password,
                'IP': IP,
                'date': new Date().toJSON()
            };
            var token = await Session.createToken(data);
            var newUser = new User(result.personId, result.name, result.username, result.avatar, result.password, result.email);
            var newSession = new Session(token, 'online', IP, newUser);

            if (newSession.validateSession()) {
                var message = await db.createSession(newSession);
                return ({ 'session': newSession.sessionToString(), 'message': message });
            }

        } catch (error) {
            return ({ 'error': error });
        }
    }

    static async createToken(data) {

        return new Promise((resolve, reject) => {
            var cert = fs.readFileSync('private.key');
            jwt.sign(data, cert, (error, token) => {

                if (error) {
                    console.log("aqui");
                    reject(ErrorConstants.server_error);
                } else {
                    resolve(token);
                }
            })
        });

    }

    static async search(sessionId) {
        var db = new DataBaseConnection();
        try {

            var result = await db.getSession(sessionId);
            var newUser = new User(new Person(result.personId, result.name), result.username, result.avatar, result.password, result.email);
            var newSession = new Session(result.sessionId, result.status, result.ip, newUser);
            return (newSession);
        } catch (error) {
            return ({ 'error': error });
        }


    }

    get getStatus() {

        return this.status;
    }

    set setStatus(status) {

        this.status = status;
    }

    get getSessionId() {
        return this.sessionId;
    }

    set setSessionId(sessionId) {
        this.sessionId = sessionId;
    }

    get getIP() {
        return this.IP;
    }

    set setIP(IP) {
        this.IP = IP;
    }

    validateSession() {
        if (!this.user.validateUser() || !this.user.validatePerson()) {
            return false;
        }
        else if (!this.sessionId || !this.status || !this.IP) {
            return false;
        } else if (!((this.sessionId.length > 0 && this.sessionId.length <= 255) && (this.status == 'online' || this.status == 'offline') && (this.IP.length >= 1 && this.IP.length <= 128))) {
            return false;
        } else {
            return true;
        }
    }

    validateIP(IP, username) {

        if (this.status == 'online' && this.IP == IP && this.user.username == username) {
            return true;
        } else {
            return false;
        }

    }

    sessionToString() {
        return ({ "sessionId": this.sessionId, "user": this.user.userToString() });
    }

}