import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useFetch } from '@/hooks/usefetch'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'
import { IoCameraOutline } from 'react-icons/io5'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { setUser } from '@/redux/user/user.slice'
import { getEvn } from '@/helpers/getEnv'


const Profile = () => {

	const [filePreview, setPreview] = useState()
	const [file, setFile] = useState()

	const user = useSelector((state)=> state.user)
	// console.log(user.user);
	
	const userId = user?.user?._id;
	
	const {data: userData, loading, error} = useFetch(userId? `${getEvn("VITE_API_BASE_URL")}/user/get-user/${userId}` : null,
		{ method: 'GET', credentials: 'include' });

	
	// console.log("User data", userData);
	

	const dispatch = useDispatch()

	const formSchema = z.object({
		name: z.string().min(3, 'Name must be 3 character long'),
		email: z.string().email(),
		bio: z.string().min(3, 'Bio must be 3 character long'),
		password: z.string(),
	  })
	
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name:"",
			email: "",
			bio: '',
			password:''
		},
	})

	useEffect(()=> {
		if(userData && userData.success){
			form.reset({
				name: userData.user.name,
				email: userData.user.email,
				bio: userData.user.bio,
			})
		}
	},[userData])


	async function onSubmit(values) {
		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('data', JSON.stringify(values));


			const response = await axios.put(
				`${getEvn('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`,
				formData,
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			const data = response.data;

			if (!data.success) {
				return showToast('error', data.message);
			}

			
			dispatch(setUser(data.user));
			showToast('success', data.message);

		} catch (error) {
			showToast('error', error.message);
		}
	}


	const handleFileSelection= (files)=> {
		// console.log(files);
		const file = files[0]
		const preview = URL.createObjectURL(file)
		setFile(file)
		setPreview(preview);
		
	}
	
	if(loading) return <Loading />

  return (
	<Card className='max-w-screen-md mx-auto'>
		<CardContent>
			<div className='flex justify-center items-center flex-col '>
				{/* edit */}
				<Dropzone onDrop={acceptedFiles =>handleFileSelection (acceptedFiles)}>
					{({getRootProps, getInputProps}) => (
						<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<Avatar className='size-28 relative group'>
								<AvatarImage src={filePreview? filePreview : userData?.user?.avatar || ""} className='bg-amber-500'/>
								<div className='absolute z-50 w-full h-full top-1/2 left-1/2
								-translate-x-1/2 -translate-y-1/2  justify-center items-center border-2 bg-black/10 border-violet-500 rounded-full
								group-hover:flex hidden cursor-pointer
								'>
									<IoCameraOutline color='#7c3aed'/>
								</div>
							</Avatar>
						</div>
						</section>
					)}
				</Dropzone>
			</div>

			<div>
				<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
					<div className='mb-3'>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
								<Input placeholder="enter your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
					</div>

					<div className='mb-3'>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
								<Input placeholder="Enter your email address" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
					</div>

					<div className='mb-3'>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
								<Input placeholder="Enter bio" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
					</div>

					<div className='mb-3'>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
								<Input type="password" placeholder="Enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
					</div>

					<Button type="submit" className="w-full">Save Changes</Button>
				
				</form>
				</Form>
			</div>
		</CardContent>
	</Card>
  )
};

export default Profile
