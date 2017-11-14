import DataBaseConnection from '../DAO/DataBaseConnection.js';
import ErrorConstants from '../Output/ErrorConstants.js';

export default class Album {

    constructor(albumId, name, description, user) {
        this.albumId = albumId;
        this.name = name;
        this.description = description;
        this.user = user;
    }

    static async getAlbums(username) {

        var db = new DataBaseConnection();

        try {
            var result = await db.getAlbums(username);
            return (result);
        } catch (error) {
            return ({ 'error': error });
        }

    }

}