import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';
import User from '../../Model/User.js';
import Image from '../../Model/Image.js';

export default async function (req, res) {

    var photo = req.body.photo;
    var description = req.body.description;
    var title = req.body.title;
    var comment = req.body.comment;
    var username = req.body.username;
    var sessionId = req.body.sessionId;
    var albumId = req.body.albumId;
    var IP = requestIp.getClientIp(req);

    var newSession = await Session.search(sessionId);

    if (photo && description && title && comment && username && sessionId && albumId && IP) {

        if (!newSession.error) {
            if (newSession.validateIP(IP, username)) {

                var imageOwner = await User.getUser(username);

                if (!imageOwner.error) {

                    var result = await Image.create(photo, description, title, comment, imageOwner);

                    if (!result.error) {
                        res.status(result.message.statusCode).send(JSON.stringify({ "message": result.message.name }));
                    } else {
                        res.status(result.error.statusCode).send(JSON.stringify({ "error": result.error.name }));
                    }

                } else {
                    res.status(imageOwner.error.statusCode).send(JSON.stringify({ "error": imageOwner.error.name }));
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