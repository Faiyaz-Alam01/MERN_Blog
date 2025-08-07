import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/Auth.route.js';
import userRoute from './routes/user.route.js';
import CategoryRoute from './routes/Category.route.js';
import BlogRoute from './routes/Blog.route.js';
import commentRoute from './routes/Comment.route.js';
import BlogLikeRoute from './routes/Bloglike.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser())
app.use(express.json())

app.use(cors({
	origin: "https://mern-projects-blog-wjca.vercel.app",
	credentials: true
}))

//route setup
app.use('/api/auth',router);
app.use('/api/user', userRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', commentRoute)
app.use('/api/blog-like', BlogLikeRoute)

mongoose.connect(process.env.MongoDB_Url, {dbName:'mern-blog'})
.then(()=>console.log('database is connected'))
.catch((err)=>console.log('database connection failed',err));

app.listen(PORT, ()=>{
	console.log(`server running on port ${PORT}`);
	
})

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'internal error'
	res.status(statusCode).json({
		success: false,
		statusCode,
		message
	})
})