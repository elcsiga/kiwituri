import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import {db} from "./mysql";
//import {s3} from "./s3";
import * as AWS from "aws-sdk";
import {UploadedFile} from "./common/interfaces/upload";
import {Item} from "./common/interfaces/item";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/ui'));

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
        res.json({message: 'Db connected'})
    else
        sendError(res,401, 'Db NOT connected');
});

/////////////////////

app.get('/api/items', (req, res) => {

    db.query('SELECT * FROM items')
        .then(dbItems => {
            const items: Item[] = dbItems.map(dbItem => ({
                id: dbItem.id,
                ...JSON.parse(dbItem.data)
            }));
            res.json(items);
        })
        .catch(err => {
            sendError(res,400, 'Could not retrieve items.', err);
        });
});

interface DbItem {
    id: number;
    data: string;
}

const toItem: (DbItem) => Promise<Item> = dbItem => {

    try {
        return {
            id: dbItem.id,
            ...JSON.parse(dbItem.data)
        };
    } catch (e) {
        console.log('Parse error', e);
        return Promise.reject('Parse error');
    }
};

const getItem: (number) => Promise<Item> = id => db.query('SELECT * FROM items WHERE id = ?', id)
    .then(rows => rows.length === 1 ? rows[0] : Promise.reject('Record Not found: #' + id))
    .then(toItem);

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

app.post('/api/items', (req, res) => {

    let dbItem;
    try {
        const item: Item = req.body;
        dbItem = {
            data: JSON.stringify(item)
        };
    } catch (err) {
        sendError(res,400, 'Invalid item.ts format.', err);
    }

    if (dbItem) {
        db.query('INSERT INTO items SET ?', dbItem)
            .then(result => getItem(result.insertId))
            .then(item => res.json(item))
            .catch(err => {
                sendError(res,400, 'Could not insert item.', err);
            });
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














