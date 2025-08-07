import { RouteSignUp } from '@/helpers/RouteName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const AuthRouteProtection = () => {
	const user = useSelector((state) => state.user)
	console.log('redux user', user);
	

	if(user && user.isLoggedIn) {
		return <Outlet />
	} else{
		return <Navigate to={RouteSignUp}/>
	}
}
	

export default AuthRouteProtection
