import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routers/index.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const URI = 'mongodb+srv://admin:EsOhBWp6KClCmCKK@cluster0.uhr0soy.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use('/', cors());

//connect to DB and run server
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connect to DB');
        app.listen(PORT, () => {
            console.log('run server');
        });
    })
    .catch(err => {
        throw (err);
    })


route(app);