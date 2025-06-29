import express from 'express';
import { loginUser, registerUser, adminLogin, getUserInfo, updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/info', authUser, getUserInfo);
userRouter.post('/update-profile', authUser, updateProfile);

export default userRouter;