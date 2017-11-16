import DataBaseConnection from '../DAO/DataBaseConnection.js';
import ErrorConstants from '../Output/ErrorConstants.js';

export default class Image {

    constructor(photo, description, title, comment, user) {
        //this.idImage;
        this.photo = photo;
        this.description = description;
        this.title = title;
        this.comment = comment;
        this.user = user;
    }

    static async create(photo, description, title, comment, user) {

        var db = new DataBaseConnection();
        var newImage = new Image(photo, description, title, comment, user);

        console.log(newImage);

        if (newImage.validateImage()) {

            try {
                var message = await db.insertImage(newImage);
                return ({ 'message': message });

            } catch (error) {
                return ({ 'error': error });
            }

        } else {
            return ({ 'error': ErrorConstants.invalid_image_information });
        }
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

    validateImage() {

        if (!this.user.validateUser()) {
            return false;
        } else if (!this.photo || !this.description || !this.title || !this.comment) {
            return false;
        } else if (!((this.title.length >= 5 && this.title.length <= 20) && (this.comment.length > 0 && this.comment.length <= 255) && (this.description.length > 0 && this.description.length <= 255))) {
            return false;
        } else {
            return true;
        }
    }
}