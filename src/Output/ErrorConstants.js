import Output from './Output.js';

export default {

    missing_information: new Output("missing_information", 400),
    person_exists: new Output("person_exists", 400),
    data_base_error: new Output("data_base_error", 500),
    user_exists: new Output("user_exists", 400),
    image_creation_error: new Output("image_creation_error", 500),
    username_does_not_exists: new Output("username_does_not_exists", 400),
    password_incorrect: new Output("password_incorrect", 400),
    server_error: new Output("server_error", 500),
    session_exists: new Output("session_exists", 400),
    session_does_not_exists: new Output("session_does_not_exists", 400),
    invalid_session: new Output("invalid_session", 401),
    invalid_image_information: new Output("invalid_image_information", 400),
    user_not_authorized: new Output("user_not_authorized", 401),
    sql_injection: new Output("sql_injection", 400),

}