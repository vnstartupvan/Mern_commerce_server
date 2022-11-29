import express from 'express';
import { search } from '../controllers/search.controller.js';
const route = express.Router();
const searchController  = new search();
route.get('/search', searchController.index)
export default route