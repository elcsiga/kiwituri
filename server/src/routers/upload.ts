import * as express from "express";

import {UploadedFile} from "../common/interfaces/upload";

import * as multer from 'multer';
import * as multerS3 from 'multer-s3-transform';
import * as sharp from 'sharp';
import * as uuid from 'uuid/v1';
import * as AWS from "aws-sdk";

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucketName = 'kiwituri-storage';
export const uploadRouter = express.Router();

//////////////////////////////////////

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        acl: 'public-read',
        shouldTransform: function (req, file, cb) {
            cb(null, /^image/i.test(file.mimetype));
        },
        transforms: [
            {
                id: 'thumbnail',
                key: (req, file, cb) => {
                    cb(null, 'thumbnail-' + uuid());
                },

                transform: function (req, file, cb) {
                    cb(
                        null,
                        sharp()
                            .rotate()
                            .resize(600, 600)
                            .max()
                    );
                }
            },
            {
                id: 'normal',
                key: (req, file, cb) => {
                    cb(null, 'normal-' + uuid());
                },

                transform: function (req, file, cb) {
                    //Perform desired transformations
                    cb(
                        null,
                        sharp()
                            .rotate()
                            .resize(1600, 1600, {
                                withoutEnlargement: true
                            })
                            .max()
                    );
                }
            }
        ],
    })
});

//accepts one file with name 'uploadedfile' as FromData

uploadRouter.post('/', upload.single('uploadedfile'), function (req, res) {

    const file = req.file as Express.MulterS3.File;
    const thumbnail = (file as any).transforms.find(t => t.id === 'thumbnail');
    const normal = (file as any).transforms.find(t => t.id === 'normal');

    const uploadedFile: UploadedFile = {

        filename: file.originalname,
        thumbnail: {
            id: thumbnail.key,
            size: thumbnail.size,
            url: thumbnail.location,
        },
        normal: {
            id: normal.key,
            size: normal.size,
            url: normal.location,
        }
    };

    res.json(uploadedFile);
});
