import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

//import {db} from "./db/mysql";
import {itemsRouter} from "./routers/items";
//import {uploadRouter} from "./routers/upload";
import {mailerRouter} from "./routers/mail";
import {errorHandler, sendError} from "./utils/error";
//import {initAuth} from "./routers/authentication";
import {testRouter} from "./routers/test";
import {configRouter} from "./routers/config";

async function main() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/ui'));

    //logger
    app.use(function (req, res, next) {
        console.log('_________________________________');
        console.log('REQUEST:', req.method, req.originalUrl);
        next();
    });

    //initAuth(app);

    //db
    //await db.connect();

    //modules
    app.use('/api/config', configRouter);
    app.use('/api/test', testRouter);
    //app.use('/api/upload', uploadRouter);
    app.use('/api/items', itemsRouter);
    app.use('/api/mail', mailerRouter);

    //ui
    app.get('/*', (req, res) => {
        res.sendFile(__dirname + '/ui/index.html');
    });

    //error handler
    app.use(errorHandler);

    const port = process.env.PORT || 3000;
    console.log(`Listening on ${port}`);
    app.listen(port);
}

main().catch(err => console.error(err));














