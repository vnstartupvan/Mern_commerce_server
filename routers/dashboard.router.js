import express from 'express';
import { dashboard } from '../controllers/dashboard.controller.js';
const route = express.Router();
const dashboardController = new dashboard();
route.post('/dashboard/create-product', dashboardController.createProduct);
route.post('/dashboard/delete-product', dashboardController.destroyProduct);
route.post('/dashboard/update-product', dashboardController.editProduct);
route.post('/dashboard/create-collection', dashboardController.createCollection);
route.post('/dashboard/edit/collection:id', dashboardController.editCollection);
route.get('/dashboard/collections', dashboardController.getCollections);
route.get('/dashboard/products', dashboardController.getProducts);
route.post('/dashboard/delete-user', dashboardController.destroyUser);
route.post('/dashboard/update-user', dashboardController.editUser);
route.get('/dashboard/users', dashboardController.getUsers);


export default route