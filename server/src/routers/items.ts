import * as express from 'express';
import {db} from "../db/mysql";
import {
    BuyData,
    DbItemRecord,
    fromDbItemRecord,
    ItemBody,
    ItemOrder,
    ItemRecord, ItemStatus,
    toDb
} from "../common/interfaces/item";
import {sendError} from "../utils/error";
import {expectLoggedInUser} from "./authentication";
import {allowChangeStatus, hasOrder} from "../common/validators/status";

export const itemsRouter = express.Router();

/////////////////////

interface ItemDataPayload {
    data: string;
}

interface ItemBuyPayload {
    order: string;
    status: ItemStatus;
}

interface ItemStatusPayload {
    status: ItemStatus;
}

const getItem: (number) => Promise<ItemRecord> = id => db.query<DbItemRecord[], number>('SELECT * FROM items WHERE id = ?', id)
    .then(rows => rows.length === 1 ? Promise.resolve(rows[0]) : Promise.reject('Record Not found: #' + id))
    .then(row => fromDbItemRecord(row));

// ROUTER //

itemsRouter.get('/', (req, res) => {

    db.query<DbItemRecord[]>('SELECT * FROM items ORDER BY id DESC')
        .then(dbItemsRecords => {
            const itemRecords: ItemRecord[] = dbItemsRecords.map(fromDbItemRecord);
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

    expectLoggedInUser(req);

    const dbItemBody: string = toDb<ItemBody>(req.body);
    if (dbItemBody) {
        db.query<any, ItemDataPayload>('INSERT INTO items SET ?', {data: dbItemBody})
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

    expectLoggedInUser(req);

    const id: number = +req.params.id;
    const dbItemBody: string = toDb<ItemBody>(req.body);

    if (id && dbItemBody) {
        db.query<any, [ItemDataPayload, number]>('UPDATE items SET ? WHERE id = ?', [{data: dbItemBody}, id])
            .then(() => {
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

itemsRouter.put('/:id/status/:status', (req, res) => {

    expectLoggedInUser(req);

    const id: number = +req.params.id;
    const status: ItemStatus = req.params.status;

    if (id && status) {
        getItem(id)
            .then(originalItem => {
                if (allowChangeStatus(originalItem, status)) {

                    let payLoad: ItemStatusPayload | ItemBuyPayload;
                    if (hasOrder(status)) {
                        payLoad = {status: status as ItemStatus};
                    } else {
                        payLoad = {
                            status: status as ItemStatus,
                            order: null
                        };
                    }
                    db.query<any, [ItemStatusPayload | ItemBuyPayload, number]>(
                        'UPDATE items SET ? WHERE id = ?', [payLoad, id])
                        .then(() => {
                            return getItem(id);
                        })
                        .then(item => res.json(item))
                        .catch(err => {
                            sendError(res, 400, 'Could not update item.', err);
                        });

                } else {
                    sendError(res, 400, 'Npt allowed to change status.');
                }
            })
            .catch(err => {
                sendError(res, 400, 'Could not find item.', err);
            });

    } else {
        sendError(res, 400, 'Could not update item.', id);
    }
});

itemsRouter.post('/buy', (req, res) => {

    db.query<DbItemRecord[]>('SELECT * FROM items')
        .then(dbItemsRecords => {
            const allItemRecords: ItemRecord[] = dbItemsRecords.map(fromDbItemRecord);

            let orderId;
            do {
                orderId = Math.floor(Math.random() * 900) + 100; // 100-999
            } while (allItemRecords.some(item => item.order && item.order.id === orderId));

            const buyData = req.body as BuyData;
            if (buyData && buyData.email && buyData.email.length && buyData.itemIds && buyData.itemIds.length) {

                const itemRecords = allItemRecords.filter(item => buyData.itemIds.includes(item.id));

                if (itemRecords.length !== buyData.itemIds.length) {
                    sendError(res, 400, 'Not found all items to buy.');
                } else if (!itemRecords.every(i => !i.status || i.status === 'STATUS2_ACTIVE')) {
                    sendError(res, 400, 'Not all items are active.');
                } else {
                    const updates = itemRecords.map(i => {

                        const order: ItemOrder = {
                            id: orderId,
                            email: buyData.email,
                            date: Date.now()
                        };

                        const itemPayload: ItemBuyPayload = {
                            status: 'STATUS3_ORDERED',
                            order: toDb<ItemOrder>(order)
                        };

                        return db.query<DbItemRecord[], [ItemBuyPayload, number]>(
                            'UPDATE items SET ? WHERE id = ?', [itemPayload, i.id])
                            .then(() => getItem(i.id));
                    });

                    Promise.all(updates).then(items => {
                        console.log('SUCCESSFUL ORDER: ', orderId);
                        res.json({orderId, items});
                    }).catch(err => {
                        sendError(res, 400, 'Could not update item.', err);
                    });
                }
            }
        })
        .catch(err => {
            sendError(res, 400, 'Could not retrieve items.', err);
        });
});

itemsRouter.delete('/:id', (req, res) => {
    expectLoggedInUser(req);
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

