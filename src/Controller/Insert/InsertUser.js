import Person from '../../Model/Person.js';
import User from '../../Model/User.js';
import ErrorConstants from '../../Output/ErrorConstants.js';

export default async function (req, res) {

    var personId = req.body.personId;
    var name = req.body.name;
    var username = req.body.username;
    var avatar = req.body.avatar;
    var password = req.body.password;
    var email = req.body.email;

    var newUser = new User(personId, name, username, avatar, password, email, 'REGULAR');

    if (newUser.validatePerson() && newUser.validateUser()) {

        var result = await newUser.insertUser();

        if (!result.error) {
            res.status(result.message.statusCode).send(JSON.stringify({ "message": result.message.name }));
        } else {
            res.status(result.error.statusCode).send(JSON.stringify({ "error": result.error.name }));
        }
    } else {
        var result = await JSON.stringify({ 'error': [ErrorConstants.missing_information.name] });
        res.status(ErrorConstants.missing_information.statusCode).send(result);
    }
}