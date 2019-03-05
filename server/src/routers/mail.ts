import * as express from "express";
import * as AWS from "aws-sdk";
import {sendError} from "../utils/error";

export const mailerRouter = express.Router();

// Load the SDK for JavaScript

// Set the region
AWS.config.update({region: 'eu-west-1'});

mailerRouter.get('/test', (req, res) => {

    var params = {
        Destination: {
            CcAddresses: [],
            ToAddresses: ['elcsiga@gmail.com']
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "<b>Hello</b> Árvíztűrő Tükörfúrógép!"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Hello Árvíztűrő Tükörfúrógép!"
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Hello Árvíztűrő Tükörfúrógép!'
            }
        },
        Source: 'elcsiga@gmail.com',
        ReplyToAddresses: []
    };

    new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise().then(
        function(data) {
            res.json({
                messageId: data.MessageId
            });
        }).catch(
        function(err) {
            sendError(res, 400, 'Failed to send email.', err);
        });
});

