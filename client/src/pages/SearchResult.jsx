import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { useFetch } from '@/hooks/usefetch';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {

	const [searchParams] = useSearchParams();
	const q = searchParams.get('q')

	const {data: blogData, loading} = useFetch(`${import.meta.env.VITE_API_BASE_URL}/blog/search?q=${q}`,{
		method:"get",
		credentials: 'include'
	})

	console.log(blogData);
	
	
	if(loading) return <Loading />
	
	return (
		<>
			<div className='flex items-center gap-3 font-bold text-2xl border-b text-violet-500  pb-3 mb-5'>
				<h4>Search Result for : {q}</h4>
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

export default SearchResult
