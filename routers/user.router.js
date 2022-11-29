import express from 'express';
import { user } from '../controllers/user.controller.js';
const route = express.Router();
const userController  = new user();

route.post('/login', userController.login);
route.post('/register', userController.create);
route.post('/user/update', userController.update);
export default route