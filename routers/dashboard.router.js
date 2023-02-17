import express from 'express';
import { dashboard } from '../controllers/dashboard.controller.js';
import { isAuth } from '../middleware/auth.middleware.js';
const route = express.Router();
const dashboardController = new dashboard();
route.post('/dashboard/create-product',isAuth, dashboardController.createProduct);
route.post('/dashboard/delete-product',isAuth, dashboardController.destroyProduct);
route.post('/dashboard/update-product',isAuth, dashboardController.editProduct);
route.post('/dashboard/create-collection',isAuth, dashboardController.createCollection);
route.post('/dashboard/edit/collection:id',isAuth, dashboardController.editCollection);
route.get('/dashboard/collections',isAuth, dashboardController.getCollections);
route.get('/dashboard/products',isAuth, dashboardController.getProducts);
route.post('/dashboard/delete-user',isAuth, dashboardController.destroyUser);
route.post('/dashboard/update-user',isAuth, dashboardController.editUser);
route.get('/dashboard/users',isAuth, dashboardController.getUsers);


export default route