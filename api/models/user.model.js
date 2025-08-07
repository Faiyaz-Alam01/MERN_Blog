import mongoose, { Schema } from 'mongoose'

const userShema = new Schema({
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin'],
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	bio: {
		type: String,
		trim: true
	},
	avatar: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}
},{timestamps : true})

export const User = mongoose.model("User", userShema);