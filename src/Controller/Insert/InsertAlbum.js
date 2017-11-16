import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';
import User from '../../Model/User.js';
import Album from '../../Model/Album.js';

export default async function (req, res) {

    var name = req.body.name;
    var description = req.body.description;
    var username = req.body.username; //Session Owner
    var sessionId = req.body.sessionId;
    var IP = requestIp.getClientIp(req);

    var newSession = await Session.search(sessionId);

    if (name && description && username && sessionId) {

        if (!newSession.error) {

            if (newSession.validateIP(IP, username)) {

                var albumOwner = await User.getUser(username);

                if (!albumOwner.error) {

                    var newAlbum = new Album(name, description, albumOwner);
                    var result = await newAlbum.create();

                    if (!result.error) {
                        res.status(result.message.statusCode).send(JSON.stringify({ "message": result.message.name }));
                    } else {
                        res.status(result.error.statusCode).send(JSON.stringify({ "error": result.error.name }));
                    }
                } else {
                    res.status(albumOwner.error.statusCode).send(JSON.stringify({ "error": albumOwner.error.name }));
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