import * as express from 'express';
import * as cors from 'cors';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import {db} from "./mysql";
//import {s3} from "./s3";
import * as AWS from "aws-sdk";

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/ui'));

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucketName = 'kiwituri-storage';

class ServerError extends Error {
    constructor(
        public status: number,
        public message: string,
        public error?: any
    ) {
        super(message);
    }
}

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

app.post('/api/upload', upload.single('uploadedfile'), function (req, res, next) {
    const file = req.file as Express.MulterS3.File;
    res.json({
        id: file.key,
        size: file.size,
        url: file.location,
        filename: file.originalname,
    });
});

app.get('/api/test', (req, res) => {
    res.json({message: 'Hello world'});
});

app.get('/api/error', (req, res) => {
    throw new ServerError(444, 'Api error test');
});

app.get('/api/db', (req, res) => {
    if ( dbReady )
        res.json({message: 'Db connected'})
    else
        throw new ServerError(401, 'Db NOT connected');
});

app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items')
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            throw new ServerError(400, 'Could not retrieve items.', err);
        });
});

//ui
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/ui/index.html');
});

//error handler
app.use(function (err, req, res, next) {

    console.error('Server error:', err);
    if (err instanceof ServerError) {
        res.status(err.status);
        res.json({
            status: err.status,
            message: err.message,
            error: err.error
        });
    } else {
        res.status(500);
        res.json({
            status: 500,
            message: err.message,
            error: err
        });
    }
});



const port = process.env.PORT || 3000;
console.log(`Listening on ${port}`);
app.listen(port);














