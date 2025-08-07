import AppSidebar from '@/components/AppSidebar'
import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { useFetch } from '@/hooks/usefetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import { BiCategory } from "react-icons/bi";


const BlogByCategory = () => {

	const {category} = useParams()

	const {data: blogData, loading} = useFetch(`${import.meta.env.VITE_API_BASE_URL}/blog/get-blog-by-category/${category}`,{
		method:"get",
		credentials: 'include'
	},[category])
	
	console.log("category", blogData);
	

	if(loading) return <Loading />

	return (
		<>
			<div className='flex items-center gap-3 font-bold text-2xl border-b text-violet-500  pb-3 mb-5'>
				<BiCategory />
				<h4>{blogData && blogData.categoryData.name}</h4>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
				{blogData && blogData.blog.length > 0 ?
					blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
					:
					<div> Data Not Found</div>
				}

			</div>
		</>	

	)
}

export default BlogByCategory
