import React, { useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from './ui/card'
import { showToast } from '@/helpers/showToast'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RouteSignIn } from '@/helpers/RouteName'
import CommentList from './CommentList'


const Comment = ({props}) => {

	const [newComment, setNewComment] = useState()

	const user = useSelector((state) => state.user)
	
	const formSchema = z.object({
		comment: z.string().min(3,'comment must be at least 3 character long.'),
	})
	
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment:"",
		},
	})
	
	
	async function onSubmit(values) {
		try{
			const newValues ={...values, blogid: props.blogid, user: user.user._id}
			// console.log('newValues', newValues);
			
			const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/comment/add`, newValues);

			const data = response.data;
			
			if(!data.success){
				return showToast('error', data.message)        
			}
			setNewComment(data.comment)
			form.reset(); //reset form after submit
			showToast('success', data.message)
			
		}catch(error){
			showToast('error',error.message )
		}
  	}

  return (
	<div>
		<h4 className='flex items-center gap-2 text-2xl  font-bold'><FaComment 
			className='text-violet-500'/>Comment</h4>

			{user && user.isLoggedIn ? 
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className='my-4'>
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Comment</FormLabel>
								<FormControl>
									<textarea placeholder='Type your comment...'  {...field} className='border p-2'/>
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
						</div>

						<Button type="submit" className="">Submit</Button>


					</form>
				</Form>
			:
			   <Button asChild>
					<Link to={RouteSignIn}>Sign In</Link>
			   </Button>
			}

			<div className='mt-5'>
				<CommentList props={{blogid: props.blogid, newComment}}/>
			</div>
	</div>
  )
}

export default Comment
