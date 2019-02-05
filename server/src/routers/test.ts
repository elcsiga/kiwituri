
import * as express from 'express';
import { db } from "../db/mysql";
import { sendError } from "../utils/error";
import { config } from "./config";
export const testRouter = express.Router();

testRouter.get('/', (req, res) => {
    res.json({
        api: 'ready',
        db: db.isConnected() ? 'connected' : 'not connected',
        config: config ? config : 'not loaded'
    });
});

testRouter.get('/error', (req, res) => {
    sendError(res, 444, 'Api error test');
});
