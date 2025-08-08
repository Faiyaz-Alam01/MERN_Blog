import { useFetch } from '@/hooks/usefetch'
import React from 'react'
import { FaRegComment } from 'react-icons/fa'
import Loading from './Loading'
import { getEvn } from '@/helpers/getEnv'


const CommentCount = ({props}) => {

	const { data, loading, error } = useFetch(`${getEvn("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`, {
		method: 'get',
		credentials: 'include',
	})	
	

	if(loading) return <Loading />
	return (
		<button type='button' className='flex justify-center items-center gap-1'>
			<FaRegComment />
			{data && data.commentCount}
		</button>
	)
}

export default CommentCount
