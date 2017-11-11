import Person from './Person.js';
import DataBaseConnection from '../DAO/DataBaseConnection.js';

export default class User extends Person {

    constructor(personId, name, username, avatar, password, email) {
        super(personId, name);
        this.username = username;
        this.avatar = avatar;
        this.password = password;
        this.email = email;
    }

    get getUsername() {
        return this.username;
    }

    get getAvatar() {
        return this.avatar;
    }

    get getPassword() {
        return this.password;
    }

    get getEmail() {
        return this.email;
    }

    get getAlbumColletion() {
        return this.albumCollection;
    }

    set setUsername(username) {
        this.username = username;
    }

    set setAvata(avatar) {
        this.avatar = avatar;
    }

    set setPassword(password) {
        this.password = password;
    }

    set setEmail(email) {
        this.email = email;
    }

    set setAlbumCollection(albumCollection) {
        this.albumCollection = albumCollection;
    }

    validateUser() {
        if (!this.username || !this.password || !this.avatar || !this.email) {
            return false;
        } else if (!((this.username.length >= 5 && this.username.length <= 20) && (this.password.length >= 5 && this.password.length <= 20) && (this.email.length >= 5 && this.email.length <= 20))) {
            return false;
        } else {
            return true;
        }

    }

    async insertUser() {
        var db = new DataBaseConnection();
        try {
            var message = await db.insertUser(this);
            return ({ 'message': message });

        } catch (error) {
            return ({ 'error': error });
        }
    }

    userToString() {
        return ({ "person": this.personToString(), "username": this.username, "avatar": this.avatar, "email": this.email });
    }
}

