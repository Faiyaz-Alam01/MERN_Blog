import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/usefetch.js'
import Loading from '@/components/Loading'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import { deletedata } from '@/helpers/handleDelete.js'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'

const CategoryDetails = () => {

	const[refreshData, setRefreshData] = useState(false)

	const {data:categoryData, loading, error} = useFetch(`${getEvn("VITE_API_BASE_URL")}/category/all-category`,{
		method:"get",
		credentials: 'include'
	}, [refreshData])

	// console.log(categoryData);
	
	const handleDelete =(id)=>{
		const response = deletedata(`${getEvn("VITE_API_BASE_URL")}/category/delete/${id}`)

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
		<Card>
			<CardHeader>
				<div>
					<Link to={RouteAddCategory}>
						<Button>Add Category</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent className='mt-4'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead >Category</TableHead>
							<TableHead>Slug</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categoryData && categoryData.category.length> 0 ?
							categoryData.category.map((category) =>
								<TableRow key={category._id}>
									<TableCell>{category.name}</TableCell>
									<TableCell>{category.slug}</TableCell>
									<TableCell className='flex gap-4'>
										<Button variant='outline' className='hover:bg-violet-500 hover:text-white' asChild>
											<Link to={RouteEditCategory(category._id)}>
												<FaEdit />
											</Link>
											
										</Button>

										<Button 
											onClick={() => handleDelete(category._id)}
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
  )
}

export default CategoryDetails
