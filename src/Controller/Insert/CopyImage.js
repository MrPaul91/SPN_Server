import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';
import User from '../../Model/User.js';
import Album from '../../Model/Album.js';
import AlbumxImage from '../../Model/AlbumxImage.js';

export default async function (req, res) {

    var username = req.body.username; //Session Owner
    var sessionId = req.body.sessionId;
    var albumId = req.body.albumId;
    var idImage = req.body.idImage;
    var IP = requestIp.getClientIp(req);

    console.log(req.body);

    var newSession = await Session.search(sessionId);

    if (username && sessionId && albumId && idImage) {

        if (!newSession.error) {

            if (newSession.validateIP(IP, username)) {

                var result = await AlbumxImage.create(idImage, albumId);

                if (!result.error) {
                    res.status(result.message.statusCode).send(JSON.stringify({ "message": result.message.name }));
                } else {
                    res.status(result.error.statusCode).send(JSON.stringify({ "error": result.error.name }));
                }

            } else {
                res.status(ErrorConstants.invalid_session.statusCode).send(JSON.stringify({ "error": ErrorConstants.invalid_session.name }));
            }
        } else {
            res.status(newSession.error.statusCode).send(JSON.stringify({ "error": newSession.error.name }));
        }
    } else {
        res.status(ErrorConstants.missing_information.statusCode).send(JSON.stringify({ "error": ErrorConstants.missing_information.name }));
    }

}