//Bien
import requestIp from 'request-ip';
import ErrorConstants from '../../Output/ErrorConstants.js';
import Session from '../../Model/Session.js';

export default async function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var IP = requestIp.getClientIp(req);

    if (username && password) {
        var result = await Session.loginSession(username, password, IP);

        if (!result.error) {
            res.status(result.message.statusCode).send(JSON.stringify({ "message": result.message.name, "user": result.session.user, "sessionId": result.session.sessionId }));
        } else {
            res.status(result.error.statusCode).send(JSON.stringify({ "error": result.error.name }));
        }
    } else {
        res.status(ErrorConstants.missing_information.statusCode).send(JSON.stringify({ "error": ErrorConstants.missing_information.name }));
    }

}