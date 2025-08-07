import { useFetch } from '@/hooks/usefetch'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import moment from 'moment'
import { useSelector } from 'react-redux'
import  usericon from '@/assets/images/user.png'


const CommentList = ({props}) => {

	const user = useSelector((state) => state.user)
	// console.log("user", user);
	
	const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/comment/get/${props.blogid}`, {
		method: 'get',
		credentials: 'include',
	})
	
	// console.log('data', data);
	
	if(loading) return <div>Loading...</div>
	return (
		<div>
			<h4 className='text-2xl font-bold'>
				{
					props.newComment ? 
						<span className='me-2'>{data && data.comment.length + 1}</span>
						:
						<span className='me-2'>{data && data.comment.length}</span>	

				} Comments
			</h4>

			<div className='mt-5'>
				{/* new comment add hoga tab refresh ho ad ho jayega automatic */}
				{props.newComment
					&& 				
					<div className='flex gap-2 m-3 p-2'>
						<Avatar>
							<AvatarImage src={user?.user.avatar || usericon} />
						</Avatar>
						
						<div>
							<p className='font-bold'>{user?.user.name }</p>
							<p>{moment(props.newComment.comment.createdAt).format("DD-MM-YY")}</p>
							<div className='pt-2'>
								{props.newComment.comment?.comment}
							</div>
						</div>
					</div>	
				}		
				{/* when the page will be reloade then fetch data from backend*/}				
				{data && data.comment.length > 0
					&& 	
					data.comment.map(comment => {
						return (
							<div key={comment._id} className='flex gap-2 m-3 p-2'>
								<Avatar>
									<AvatarImage src={comment?.user.avatar || usericon} />
								</Avatar>
								
								<div>
									<p className='font-bold'>{comment?.user.name }</p>
									<p>{moment(comment?.createdAt).format("DD-MM-YY")}</p>
									<div className='pt-2'>
										{comment?.comment}
									</div>
								</div>
							</div>	
						)
					})			
				}
			</div>


		</div>
	)
}

export default CommentList
