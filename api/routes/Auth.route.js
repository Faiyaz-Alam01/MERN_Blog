import express from 'express'
import { googleLogin, login, Logout, register } from '../controllers/Auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.post('/google-login', googleLogin)
router.get('/logout',authenticate, Logout)

export default router;