import * as express from 'express';
import {db} from "../db/pg";
import {sendError} from "../utils/error";
import {expectLoggedInUser} from "./authentication";

export const configRouter = express.Router();

interface DbConfig {
    key: string;
    value: string;
}

configRouter.get('/', (req, res) => {
    return db.query<DbConfig[]>('SELECT * FROM config')
        .then(configs => {
            res.json(configs);
        })
        .catch(err => {
            sendError(res, 400, 'Could not retrieve config.', err);
        });
});

configRouter.put('/:key', (req, res) => {
    expectLoggedInUser(req);

    const key: string = req.params.key;
    const value: string = req.body.config;

    if (key && value) {
        db.query<any, [object, object]>('UPDATE config SET ? WHERE ?', [{value}, {key}])
            .then(result => res.json(result))
            .catch(err => {
                sendError(res, 400, 'Could not update config.', err);
            });
    } else {
        sendError(res, 400, 'Could not update config.', key);
    }
});
