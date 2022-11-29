import express from 'express';
import { home } from '../controllers/home.controller.js';
const route = express.Router();
const homeController  = new home();
route.get('/', homeController.index)
route.get('/upload', homeController.post)



export default route