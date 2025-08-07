import mongoose, { Schema } from 'mongoose'

const blogSchema = new Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'Category',
		required: true,

	},
	title: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	slug: {
		type: String,
		required: true,
		trim: true
	}, 
	featureImage: {
		type: String,
		required: true,
		trim: true
	},
	blogContent: {
		type: String,
		require: true,
		trim: true
	}
},{timestamps: true})

export const Blog = mongoose.model('Blog', blogSchema);