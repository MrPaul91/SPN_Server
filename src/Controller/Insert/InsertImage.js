import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';

export default async function (req, res) {

    var photo = req.body.photo;
    var description = req.body.description;
    var title = req.body.title;
    var comment = req.body.comment;
    var username = req.body.username;
    var sessionId = req.body.sessionId;
    var IP = requestIp.getClientIp(req);;

    var newSession = await Session.search(sessionId);

    if (photo && description && title && comment && username & sessionId && IP) {
        if (!newSession.error) {

            if (newSession.validateIP(IP, username)) {

                
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