import express from 'express';
import { user } from '../controllers/user.controller.js';
import { authControl } from '../controllers/auth.controller.js';
const route = express.Router();
const userController = new user();
const authController = new authControl();

route.post('/login', authController.login);
route.post('/register', authController.register);
route.post('/user/update', userController.update);
export default route