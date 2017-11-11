import Output from './Output.js';

export default {
    user_created: new Output('user_created', 200),
    album_created: new Output('album_created', 200),
    session_created: new Output('session_created', 200),
    image_created: new Output('image_created', 200),
    albumximage_created: new Output('albumximage_created', 200),
    logIn_successful: new Output('logIn_successful', 200),
    image_updated: new Output('image_updated', 200),
}