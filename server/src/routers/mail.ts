import * as express from "express";
import * as AWS from "aws-sdk";
import {sendError} from "../utils/error";
import {ItemOrder} from "../common/interfaces/item";

export const mailerRouter = express.Router();

// Load the SDK for JavaScript

// Set the region
AWS.config.update({region: 'eu-west-1'});

mailerRouter.get('/test', (req, res) => {

    const params = {
        Destination: {
            CcAddresses: [],
            ToAddresses: ['kovacsandras@anzix.net']
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
        Source: 'noreply@kiwituri.com',
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

export function sendOrderMail(order: ItemOrder) {

    const params = {
        Destination: {
            ToAddresses: [order.email],
            BccAddresses: ['kiwituri@googlegroups.com']
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
<p>
  Köszönjük a rendelést!
</p>
<p>
  A rendelésed sorszáma: <b>${order.id}</b>
</p>
<p>
  Az alábbi linken ellenőrizni tudod, hogy mit rendeltél, 
  és bármikor megnézheted, hogy megérkeztek-e a ruhál a kávézóba:
  <a href="http://kiwituri.com/order/${order.id}">
    http://kiwituri.com/order/${order.id}
  </a>
</p>
<p>
  A KIWI TURI csapata
</p>`
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `
Köszönjük a rendelést!

A rendelésed sorszáma: ${order.id}

Az alábbi linken ellenőrizni tudod, hogy mit rendeltél, 
és bármikor megnézheted, hogy megérkeztek-e a ruhál a kávézóba:
http://kiwituri.com/order/${order.id}

A KIWI TURI csapata`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `[kiwituri] Rendelés - ${order.id}`
            }
        },
        Source: 'noreply@kiwituri.com',
        ReplyToAddresses: []
    };

    new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise().then(
        function(data) {
            console.log('MAIL SENT:', data.MessageId);
        }).catch(
        function(err) {
            console.log('MAIL ERROR:', err);
        });
};
