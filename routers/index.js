import express, { application } from 'express';
import homeRouter from './home.router.js';
import productRouter from './product.router.js';
import searchRouter from './search.router.js';
import collectionRouter from './collection.router.js';
import userRouter from './user.router.js';
import dashboardRouter from './dashboard.router.js';


const router = express.Router();

function route(app) {
    app.use(dashboardRouter);
    app.use(searchRouter);
    app.use(collectionRouter);
    app.use(homeRouter);
    app.use(productRouter);
    app.use(userRouter);
}

export default route;