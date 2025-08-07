import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { useFetch } from '@/hooks/usefetch'
import React from 'react'

function Index() {

	console.log('vite :', getEvn('VITE_API_BASE_URL'));
	
	const {data: blogData, loading} = useFetch(`${import.meta.env.VITE_API_BASE_URL}/blog/blogs`,{
		method:"get",
		credentials: 'include'
	})

	// console.log("blogData", blogData);
	
	if(loading) return <Loading />

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10'>
			{blogData && blogData.blog.length > 0 ?
				blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
				:
				<div> Data Not Found</div>
			}

		</div>
	)
}

export default Index
