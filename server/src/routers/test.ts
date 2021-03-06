
import * as express from 'express';
import { db } from "../db/pg";
import { sendError } from "../utils/error";
export const testRouter = express.Router();

testRouter.get('/', (req, res) => {
    res.json({
        api: 'ready',
        db: db.isConnected() ? 'connected' : 'not connected',
    });
});

testRouter.get('/error', (req, res) => {
    sendError(res, 444, 'Api error test');
});
