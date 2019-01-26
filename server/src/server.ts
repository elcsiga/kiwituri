import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import {db} from "./mysql";
//import {s3} from "./s3";
import * as AWS from "aws-sdk";
import {UploadedFile} from "./common/interfaces/upload";
import {DbItemRecord, fromDb, ItemRecord, toDb} from "./common/interfaces/item";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/ui'));

//logger
app.use(function (req, res, next) {
    console.log('_________________________________');
    console.log('REQUEST:', req.method, req.originalUrl );
    next();
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucketName = 'kiwituri-storage';

let dbReady = false;
db.connect()
    .then(() => {
        console.log('Successfully connected to db');
        dbReady = true;
    })
    .catch(err => console.error('Could not connect to db:', err));

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        acl: 'public-read'
    })
});

app.post('/api/upload', upload.single('uploadedfile'), function (req, res) {
    const file = req.file as Express.MulterS3.File;

    const uploadedFile: UploadedFile = {
        id: file.key,
        size: file.size,
        url: file.location,
        filename: file.originalname,
    };

    res.json(uploadedFile);
});

app.get('/api/test', (req, res) => {
    res.json({message: 'Hello world'});
});

app.get('/api/error', (req, res) => {
    sendError(res,444, 'Api error test');
});

app.get('/api/db', (req, res) => {
    if (dbReady)
        res.json({message: 'Db connected'});
    else
        sendError(res,401, 'Db NOT connected');
});

/////////////////////

app.get('/api/items', (req, res) => {

    db.query<DbItemRecord[]>('SELECT * FROM items')
        .then(dbItemsRecords => {
            const itemRecords: ItemRecord[] = dbItemsRecords.map(dbItemsRecord => ({
                id: dbItemsRecord.id,
                data: fromDb(dbItemsRecord.data)
            }));
            res.json(itemRecords);
        })
        .catch(err => {
            sendError(res,400, 'Could not retrieve items.', err);
        });
});

const getItem: (number) => Promise<ItemRecord> = id => db.query<DbItemRecord[], number>('SELECT * FROM items WHERE id = ?', id)
    .then(rows => rows.length === 1 ? Promise.resolve(rows[0]) : Promise.reject('Record Not found: #' + id))
    .then( row => ({ id: row.id, data: fromDb(row.data)}) );

app.get('/api/items/:id', (req, res) => {

    const id: number = +req.params.id;
    getItem(id)
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            sendError(res,400, 'Could not find item #' + id, err);
        });
});

interface ItemPayload {
    data: string;
}

app.post('/api/items', (req, res) => {

    const dbItemBody: string = toDb(req.body);
    if (dbItemBody) {
        db.query<any, ItemPayload>('INSERT INTO items SET ?', {data: dbItemBody})
            .then(result => getItem(result.insertId))
            .then(item => res.json(item))
            .catch(err => {
                sendError(res,400, 'Could not insert item.', err);
            });
    } else {
        sendError(res,400, 'Could not insert item.');
    }
});

app.put('/api/items/:id', (req, res) => {

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
                sendError(res,400, 'Could not update item.', err);
            });
    }
    else {
        sendError(res,400, 'Could not update item.', id);
    }
});

app.delete('/api/items/:id', (req, res) => {

    const id: number = +req.params.id;
    if (id) {
        getItem(id)
            .then( item => {
                db.query<any, number>('DELETE FROM items WHERE id = ?', id)
                    .then(() => res.json(item))
                    .catch(err => {
                        sendError(res,400, 'Could not delete item.', err);
                    });
            })
            .catch( err => {
                sendError(res,400, 'Could not find item to delete.', err);
            });
    }
    else {
        sendError(res,400, 'Could not delete item.', id);
    }
});

//ui
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/ui/index.html');
});

function sendError( res, status: number, message: string, error?: any ) {
    console.error('ERROR', message, status);
    res.status(status);
    res.json({
        status: status,
        message: message,
        error: error
    });
}

//error handler
app.use(function (err, req, res, next) {
    sendError(res,  500,'Runtime error', err);
});

const port = process.env.PORT || 3000;
console.log(`Listening on ${port}`);
app.listen(port);














