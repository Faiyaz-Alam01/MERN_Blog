import { RouteSignUp } from '@/helpers/RouteName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const AuthRouteProtectionAdmin = () => {
	const user = useSelector((state) => state.user)
	
	if(user && user.isLoggedIn && user.user.role === 'admin') {
		return <Outlet />
	} else{
		return <Navigate to={RouteSignUp}/>
	}
}
	

export default AuthRouteProtectionAdmin
