import express from 'express'
import { addComment, commentCount, deleteComment, getAllComments, getComments } from '../controllers/Comment.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const commentRoute = express.Router();

commentRoute.post('/add',authenticate, addComment);
commentRoute.get('/get/:blogid', getComments);
commentRoute.get('/get-count/:blogid', commentCount);
commentRoute.get('/get-all-comment', authenticate ,getAllComments)
commentRoute.delete('/delete/:commentid',authenticate, deleteComment)

export default commentRoute;