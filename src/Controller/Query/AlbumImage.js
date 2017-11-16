import path from 'path';
import fs from 'fs';

export default async function (req, res) {

    var file = path.resolve('Image/Album/' + req.params.name);
    await fs.exists(file, (exists) => {

        if (exists) {
            res.sendFile(file);
        } else {
            res.sendFile(path.resolve('Image/Default/NotFound.jpg'))
        }
    });

}