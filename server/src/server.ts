import * as express from 'express';
import * as cors from 'cors';
import {setupDb} from './db';

setupDb()
    .then(db => {

        const app = express();
        app.use(cors());

        app.use(express.static(__dirname + "/../../ui/dist"));

        const port = process.env.PORT || 3000;
        console.log(`Listening on ${port}`);
        app.listen(port);

    })
    .catch(error => console.log('DB error', error));


