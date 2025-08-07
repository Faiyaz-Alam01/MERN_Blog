import cloudinary from '../config/cloudinary.js';
import { handleError } from '../helpers/handleError.js';
import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const getUser = async(req, res, next) => {
	try {
		const {userid} = req.params
		// console.log(req.params);
		

		const user = await User.findOne({_id: userid}).lean().exec()
		if(!user){
			return next(handleError('User not found.'));
		}
		
		res.status(200).json({
			success: true,
			message: 'USer data found',
			user
		})
	} catch (error) {
		console.log('Error in getUser:', error);
		next(handleError(500, error.message));

	}
}

export const updateUser = async(req,res,next) => {
	try {
		const data = JSON.parse(req.body.data)
			
		const {userid} = req.params
		

		const user = await User.findById(userid);
		user.name = data.name
		user.email = data.email
		user.bio = data.bio

		if(data.password && password.length >=8){
			const hashedPass =bcrypt.hashSync(data.password);
			user.password = hashedPass
		}

		if(req.file) {
			//upload an image
			const uploadResult = await cloudinary.uploader
				.upload(
					req.file.path,
					{folder: 'Blog-App', resource_type: 'auto'}
				)
				.catch((error)=>{
					next(handleError(500, error.message))
				})
		    user.avatar = uploadResult.secure_url
		}

		await user.save();

		const newUser = user.toObject({getters: true})
		delete newUser.password

		res.status(200).json({
			success: true,
			message: "Data updated",
			user: newUser
		})
	} catch (error) {
		next(handleError(500, error.message));

	}
}

export const getAllUser = async(req,res, next) => {
	try {
		const user = await User.find().sort({createdAt: -1}).lean().exec()

		res.status(200).json({
			success: true,
			user
		})
	} catch (error) {
		next(handleError(500, error.message))
	}
}

export const deleteUser = async(req,res, next) => {
	try {
		const {userid} = req.params

		await User.findByIdAndDelete(userid).lean().exec()

		res.status(200).json({
			success: true,
			message: 'User deleted'
		})
	} catch (error) {
		next(handleError(500, error.message))
	}
}