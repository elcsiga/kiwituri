
import * as express from 'express';
import {db} from "../db/mysql";
import {DbItemRecord, fromDb, ItemRecord, toDb} from "../common/interfaces/item";

export const itemsRouter = express.Router();

/////////////////////

interface ItemPayload {
    data: string;
}

const getItem: (number) => Promise<ItemRecord> = id => db.query<DbItemRecord[], number>('SELECT * FROM items WHERE id = ?', id)
    .then(rows => rows.length === 1 ? Promise.resolve(rows[0]) : Promise.reject('Record Not found: #' + id))
    .then(row => ({id: row.id, data: fromDb(row.data)}));

// ROUTER //

itemsRouter.get('/', (req, res) => {

    db.query<DbItemRecord[]>('SELECT * FROM items')
        .then(dbItemsRecords => {
            const itemRecords: ItemRecord[] = dbItemsRecords.map(dbItemsRecord => ({
                id: dbItemsRecord.id,
                data: fromDb(dbItemsRecord.data)
            }));
            res.json(itemRecords);
        })
        .catch(err => {
            sendError(res, 400, 'Could not retrieve items.', err);
        });
});


itemsRouter.get('/:id', (req, res) => {

    const id: number = +req.params.id;
    getItem(id)
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            sendError(res, 400, 'Could not find item #' + id, err);
        });
});

itemsRouter.post('/', (req, res) => {

    const dbItemBody: string = toDb(req.body);
    if (dbItemBody) {
        db.query<any, ItemPayload>('INSERT INTO items SET ?', {data: dbItemBody})
            .then(result => getItem(result.insertId))
            .then(item => res.json(item))
            .catch(err => {
                sendError(res, 400, 'Could not insert item.', err);
            });
    } else {
        sendError(res, 400, 'Could not insert item.');
    }
});

itemsRouter.put('/:id', (req, res) => {

    const id: number = +req.params.id;
    const dbItemBody: string = toDb(req.body);

    if (id && dbItemBody) {
        db.query<any, [ItemPayload, number]>('UPDATE items SET ? WHERE id = ?', [{data: dbItemBody}, id])
            .then(result => {
                console.log(result);
                return getItem(id);
            })
            .then(item => res.json(item))
            .catch(err => {
                sendError(res, 400, 'Could not update item.', err);
            });
    } else {
        sendError(res, 400, 'Could not update item.', id);
    }
});

itemsRouter.delete('/:id', (req, res) => {

    const id: number = +req.params.id;
    if (id) {
        getItem(id)
            .then(item => {
                db.query<any, number>('DELETE FROM items WHERE id = ?', id)
                    .then(() => res.json(item))
                    .catch(err => {
                        sendError(res, 400, 'Could not delete item.', err);
                    });
            })
            .catch(err => {
                sendError(res, 400, 'Could not find item to delete.', err);
            });
    } else {
        sendError(res, 400, 'Could not delete item.', id);
    }
});

///////////////////
