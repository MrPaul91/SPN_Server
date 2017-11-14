import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';
import User from '../../Model/User.js';

export default async function (req, res) {

    var username = req.body.username;
    var sessionId = req.body.sessionId;
    var IP = requestIp.getClientIp(req);

    var newSession = await Session.search(sessionId);

    if (username && sessionId) {

        if (!newSession.error) {

            if (newSession.validateIP(IP, username)) {

                

            } else {
                res.status(ErrorConstants.invalid_session.statusCode).send(JSON.stringify({ "error": ErrorConstants.invalid_session.name }));
            }

        } else {
            res.status(newSession.error.statusCode).send(JSON.stringify({ "error": newSession.error.name }));
        }
    }
}