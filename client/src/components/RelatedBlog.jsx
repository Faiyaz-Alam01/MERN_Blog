import { RouteBlogDetails } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/usefetch';
import React from 'react'
import { Link } from 'react-router-dom';

const RelatedBlog = ({props}) => {
	
	const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/blog/get-related-blog/${props.category}/${props.currentBlog}`, {
		method: 'get',
		credentials: 'include',
	})

	if(loading) return <div>Loading...</div>
	return (
		<div>
			<h2 className='text-2xl p-2 font-bold mb-2'>Related Blogs</h2>
			<div>
				{data && data.relatedBlog.length > 0 && 
					data.relatedBlog.map((blog) => {
						return (
							<Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)} >
								<div  className='flex items-center gap-2'>
									<img src={blog.featureImage} className='h-16 w-28 m-2 rounded'/>
									<h4 className='line-clamp-2 font-semibold text-xl'>{blog.title}</h4>
								</div>
							</Link>
						)
					})
				}
			</div>
		</div>
	)
}

export default RelatedBlog
