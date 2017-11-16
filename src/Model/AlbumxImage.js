import DataBaseConnection from '../DAO/DataBaseConnection.js';
import ErrorConstants from '../Output/ErrorConstants.js';

export default class AlbumxImage {

    constructor(image, album, orderNumber) {

        this.image = image;
        this.album = album;
        this.orderNumber = orderNumber;
    }

    static async create(image, album) {
        var db = new DataBaseConnection();
        try {
            var result = await db.insertAlbumxImage(image, album);
            return (result);
        } catch (error) {
            return ({ 'error': error });
        }
    }

}
