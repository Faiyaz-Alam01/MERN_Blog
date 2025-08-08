import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from 'react-router-dom'
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/usefetch.js'
import { deletedata } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import { getEvn } from '@/helpers/getEnv'

const BlogDetails = () => {

	const[refreshData, setRefreshData] = useState(false)
	
		const {data: blogData, loading, error} = useFetch(`${getEvn("VITE_API_BASE_URL")}/blog/get-all`,{
			method:"get",
			credentials: 'include'
		},[refreshData])
	
		// console.log(blogData);
		
		const handleDelete =(id)=>{
			const response = deletedata(`${getEvn('VITE_API_BASE_URL')}/blog/delete/${id}`)
	
			if(response){
				setRefreshData(refreshData => (!refreshData))
				showToast('success','Data deleted.')
			}else{
				showToast('error','Data not deleted.')
			}
		}
	
		
	if(loading) return <Loading />

	return (
		<div>
		<div>
			<Card>
				<CardHeader>
					<div>
						<Link to={RouteBlogAdd}>
							<Button>Add Blog</Button>
						</Link>
					</div>
				</CardHeader>
				<CardContent className='mt-4'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Auther</TableHead>
								<TableHead>Category Name</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Slug</TableHead>
								<TableHead>Dated</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{blogData && blogData.blog.length> 0 ?
								blogData.blog.map((blog) =>
									<TableRow key= {blog._id}>
										<TableCell>{blog.author.name}</TableCell>
										<TableCell>{blog.category.name}</TableCell>
									    <TableCell>{blog.title}</TableCell>
										<TableCell>{blog.slug}</TableCell>
										<TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>

										<TableCell className='flex gap-4'>
											<Button variant='outline' className='hover:bg-violet-500 hover:text-white' asChild>
												<Link to={RouteBlogEdit(blog._id)}>
													<FaEdit />
												</Link>
												
											</Button>

											<Button 
												onClick={() => handleDelete(blog._id)}
												variant='outline' className='hover:bg-violet-500 hover:text-white'>
													<FaRegTrashAlt />
											</Button>
											
										</TableCell>
									</TableRow>
								)
								:
								<TableRow>
									<TableCell colSpan='3'>
										Data not found
									</TableCell>
								</TableRow>
							}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
			</div>
		</div>
	)
}

export default BlogDetails
