import { User } from "../models/user.model.js"
import {handleError} from "../helpers/handleError.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req, res,next) => {
	try {
		const {name, email, password} = req.body
		// console.log('comming data from client' ,req.body)

		const checkuser = await User.findOne({email})
		if(checkuser) {
			//user already registered
			next(handleError(409, "User already registered"))
		}

		const hashedPassword = bcryptjs.hashSync(password, 10)

		//register user
		const user = new User ({
			name, email, password: hashedPassword,
		})

		await user.save();

		res.status(200).json({
			success: true,
			message: "Registration successfully"
		})

	} catch (error) {
		next(handleError(500, error.message));
	}
}

export const login = async(req, res) => {
	try {
		const {email, password} = req.body
		const user = await User.findOne({email});

		if(!user){
			next(handleError(409, "Invalid login credentials."))
		}

		const hashedPassword = user.password

		const comparePassword = bcryptjs.compare(password, hashedPassword);
		if(!comparePassword){
			next(handleError(409, "Invalid login credentials."))
		}

		const token = jwt.sign({
			_id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar
		}, process.env.JWT_SECRET)

		res.cookie('access_token', token,{
			httpOnly: true,
			secure: process.env.NODE_ENV == 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			path: '/'
		})

		const newUser = user.toObject({getters: true})
		delete newUser.password

		res.status(200).json({
			success: true,
			user: newUser,
			message: 'Login successful'
		})

	} catch (error) {
		next(handleError(500, error.message));
	}
}
export const googleLogin = async(req, res,next)  => {
	try {
		const {name, email, avatar} = req.body;

		let user = await User.findOne({email});
		// console.log(user);

		if(!user){
			//create new user
			const password = Math.random().toString()
			const hashedPass = bcryptjs.hashSync(password);

			user = await User.create({
				name,
				email,
				password: hashedPass, 
				avatar
			})
			
		}else {
			let updated = false;
			if (user.avatar !== avatar) {
				user.avatar = avatar;
				updated = true;
			}
			if (user.name !== name) {
				user.name = name;
				updated = true;
			}
			if(updated) await user.save()
		}



		const token = jwt.sign({
			_id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar
		}, process.env.JWT_SECRET)

		res.cookie('access_token', token,{
			httpOnly: true,
			secure: process.env.NODE_ENV == 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			path: '/'
		})

		const newUser = user.toObject({getters: true})
		delete newUser.password

		res.status(200).json({
			success: true,
			user: newUser,
			message: 'Login successful'
		})

	} catch (error) {
		console.log('google controller error');
		
		next(handleError(500, error.message));
	}
}

export const Logout = async(req, res) => {
	try {
		
		res.clearCookie('access_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV == 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			path: '/'
		})

		res.status(200).json({
			success: true,
			message: 'Logout successful'
		})

	} catch (error) {
		next(handleError(500, error.message));
	}
}
