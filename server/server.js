import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import {v4 as uuid} from 'uuid';

import Connection from './database/db.js';
import DefaultData from './default.js';
import router from './routes/route.js';



//initialized express
const app = express();

dotenv.config();


app.use(cors());// for handling 2 different server error
app.use(bodyParser.json({extended: true}));
// app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true })); //we can also parse URL
app.use('/', router);

//create express server
const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce-web.zfrtufo.mongodb.net/?retryWrites=true&w=majority`



Connection(URL); //in DB.JS we use this

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
}

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANR_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'callback';
paytmParams['EMAIL'] = 'dutprit6@gmail.com';
paytmParams['MOBILE_NO'] = '1234567891';


