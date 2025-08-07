import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({
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
	comment: {
		type: String,
		required: true
	},
},{timestamps: true})

export const Comment = mongoose.model('Comment', commentSchema);