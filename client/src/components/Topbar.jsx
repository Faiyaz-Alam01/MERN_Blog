import React, { useState } from 'react'
import logo from '@/assets/images/logo-white.png'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import userPng from '@/assets/images/user.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import { IoAtOutline, IoLogInOutline, IoMenuOutline } from 'react-icons/io5';
import { removeUser } from '@/redux/user/user.slice.js';
import { showToast } from '@/helpers/showToast';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";
import { useSidebar } from './ui/sidebar';


function Topbar() {

  const {toggleSidebar} = useSidebar()
  const[showsearch, setshowsearch] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const user = useSelector((state)=> state.user);
//   console.log('user:', user);

  
  const handleLogout = async() =>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`,{ withCredentials: true });

      const data = response.data;
      
      if(!data.success){
		return showToast('error', data.message) 
      }
      dispatch(removeUser())
	  navigate(RouteIndex)  
	  showToast('success', data.message)     
      
    }catch(error){
      showToast('error',error.message )
    }
  }

  const showsearchSearch = () => {
		setshowsearch(!showsearch);
  }
  

  return (
	<div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5
	border-b'>
		<div className='flex justify-center items-center gap-2'>
			<button type='button' className='md:hidden' onClick={toggleSidebar}>
				<IoMenuOutline size={25}/>
			</button>
			<Link to={RouteIndex}>
				<img src={logo} className='md:w-auto w-48'/>
			</Link>
		</div>

		<div className='md:w-[500px]'>
			<div className={ `md:relative ${showsearch ? 'block' : 'hidden'} absolute bg-white left-0 md:top-0 top-16 w-full p-5 md:p-0 `}>
				<SearchBox />	
			</div>
		</div>

		<div className='flex items-center gap-5'>

			<button type='button' onClick={showsearchSearch} className='block md:hidden'>
				< IoMdSearch size={25} />
			</button>

			{!user.isLoggedIn ? (
				<Button asChild className='rounded-full'>
					<Link to={RouteSignIn}>
						<FiLogIn />
						Sign In
					</Link>
			</Button>
			): (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={user.user.avatar || userPng } />
						</Avatar>	
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						<DropdownMenuLabel>	
							<p>{user.user.name }</p>
							<p className='text-sm'>{user.user.email}</p>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className='cursor-pointer'>
							<Link to={RouteProfile}>
								<FaRegUser />
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild className='cursor-pointer'>
							<Link to={RouteBlogAdd}>
								<FaPlus />
								Create Blog
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>	
							<IoLogInOutline color='red'/>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>


	</div>
  )
}

export default Topbar