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
import userIcon from "@/assets/images/user.png"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getEvn } from '@/helpers/getEnv'


const Users = () => {

	// const user = useSelector((state) => state.user);
	// console.log(user);
	

	const[refreshData, setRefreshData] = useState(false)

	const {data, loading, error} = useFetch(`${getEvn("VITE_API_BASE_URL")}/user/get-all-users`,{
		method:"get",
		credentials: 'include'
	},[refreshData])

	console.log("get all user", data);
	
	
	const handleDelete =(id)=>{

		const response = deletedata(`${getEvn("VITE_API_BASE_URL")}/user/delete-user/${id}`)

		if(response){
			setRefreshData(refreshData => (!refreshData))
			showToast('success','Data deleted.')
		}else{
			showToast('error','Data not deleted.')
		}
	}

	// if(loading) return <Loading />	

	return (
		<div>
			<Card>
				<CardContent className='mt-4'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Role</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Avatar</TableHead>
								<TableHead>Dated</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data && data.user.length > 0 ?
								data.user.map((user) =>
									<TableRow key={user._id}>
										<TableCell>{user?.role}</TableCell>
										<TableCell>{user?.name}</TableCell>
										<TableCell>{user?.email}</TableCell>
										<TableCell>
											<Avatar>
												<AvatarImage className='text-center' src={user.avatar || userIcon} />	
											</Avatar>
										</TableCell>
										<TableCell>{moment(user.createdAt).format('DD-MM-YY')}</TableCell>
										<TableCell className='flex gap-4'>
											<Button 
												onClick={() => handleDelete(user._id)}
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

export default Users
