import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.controller.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const userRoute = express.Router();

// 2: use (authenticate) on the top automatic set on the every route
userRoute.use(authenticate)
userRoute.get('/get-user/:userid', getUser);
userRoute.put('/update-user/:userid',authenticate, upload.single('file') , updateUser);
userRoute.get('/get-all-users/',authenticate, getAllUser);
userRoute.delete('/delete-user/:userid',authenticate, deleteUser);



export default userRoute;