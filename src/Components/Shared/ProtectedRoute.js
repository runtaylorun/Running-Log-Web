import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest }) => {
	return (
		<Route {...rest} render={({ location }) => (location)} />
	)
}
