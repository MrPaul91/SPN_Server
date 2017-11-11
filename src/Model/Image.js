import DataBaseConnection from '../DAO/DataBaseConnection.js';

export default class Image {

    constructor(idImage, photo, description, title, comment, user) {
        this.idImage = idImage;
        this.photo = photo;
        this.description = description;
        this.title = title;
        this.comment = comment;
        this.user = user;
    }

    static create() {
        var db = new DataBaseConnection();
        
        
    }

    static search() {

    }

    remove() {

    }

    update() {

    }

    set setIdImage(idImage) {
        this.idImage = idImage;
    }

    set setPhoto(photo) {
        this.photo = photo;
    }

    set setDescription(description) {
        this.description = description;
    }

    set setTitle(title) {
        this.title = title;
    }

    set setComment(comment) {
        this.comment = comment;
    }

    get getIdImage() {
        return this.idImage;
    }

    get getPhoto() {
        return this.photo;
    }

    get getDescription() {
        return this.description;
    }

    get getTitle() {
        return this.title;
    }

    get getComment() {
        return this.comment;
    }


}