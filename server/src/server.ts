import * as express from 'express';
import * as cors from 'cors';
import {setupDb} from './db';

setupDb()
    .then(db => {

        const app = express();
        app.use(cors());

        app.get('/', (req, res) => {
            res.send('hello world')
        });

        const port = 3000;
        console.log(`Listening on ${port}`);
        app.listen(port);

    })
    .catch(error => console.log('DB error', error));


