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
import {FaRegTrashAlt } from 'react-icons/fa'
import { deletedata } from '@/helpers/handleDelete.js'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'
import { getEvn } from '@/helpers/getEnv'



const Comments = () => {

	const[refreshData, setRefreshData] = useState(false)

	const {data, loading, error} = useFetch(`${getEvn("VITE_API_BASE_URL")}/comment/get-all-comment`,{
		method:"get",
		credentials: 'include'
	},[refreshData])

	
	const handleDelete =(id)=>{

		const response = deletedata(`${getEvn("VITE_API_BASE_URL")}/comment/delete/${id}`)

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
			<CardContent className='mt-4'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead >Blog</TableHead>
							<TableHead>Comment By</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Comment</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data && data.comments.length > 0 ?
							data.comments.map((comment) =>
								<TableRow key={comment._id}>
									<TableCell>{comment?.blogid?.title}</TableCell>
									<TableCell>{comment?.user?.name}</TableCell>
									<TableCell>{moment(comment.createdAt).format('DD-MM-YY')}</TableCell>
									<TableCell>{comment?.comment}</TableCell>
									<TableCell className='flex gap-4'>
										<Button 
											onClick={() => handleDelete(comment._id)}
											variant='outline' className='hover:bg-red-500 hover:text-white'>
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

export default Comments
