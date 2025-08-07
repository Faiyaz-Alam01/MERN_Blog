import mongoose, { Schema } from 'mongoose'

const likeSchema = new Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	blogid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
		required: true
	},
	
},{timestamps: true})

export const BlogLike = mongoose.model('BlogLike', likeSchema);