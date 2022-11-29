import express from 'express';
import { product } from '../controllers/product.controller.js';
const route = express.Router();
const productController  = new product();
route.get('/product/:slug', productController.index)
export default route