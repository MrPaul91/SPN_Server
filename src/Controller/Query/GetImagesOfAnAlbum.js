//Bien
import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';
import Album from '../../Model/Album.js';

export default async function (req, res) {

    var username = req.body.username;
    var sessionId = req.body.sessionId;
    var albumId = req.body.albumId;
    var IP = requestIp.getClientIp(req);

    var newSession = await Session.search(sessionId);

    if (username && sessionId && albumId) {

        if (!newSession.error) {

            if (newSession.validateIP(IP, username)) {

                var result = await Album.getAlbumImages(albumId);
                res.status(result.message.statusCode).send(JSON.stringify({ "message": result.message.name, "Images": result.Images }));

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