import express from 'express';
import { collection } from '../controllers/collections.controller.js';
const route = express.Router();
const collectionController = new collection();
route.get('/collection', collectionController.index);
route.get('/collections/:slug', collectionController.show);


export default route