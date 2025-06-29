import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart); //add product to user cart
cartRouter.post('/update', authUser, updateCart); //update user cart
cartRouter.post('/get', authUser, getUserCart); //get user cart data

export default cartRouter;