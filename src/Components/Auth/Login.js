/* eslint-disable no-control-regex */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getIsUserAuthenticated } from '../../Redux/Reducers/selectors'
import { setAuthentication } from '../../Redux/Actions/user'
import ErrorBar from '../Shared/ErrorBar'
import { loginUser } from '../../Services/auth'
import { Link, useHistory } from 'react-router-dom'
import classes from './login.module.css'

const Login = () => {
	const { register, handleSubmit, errors } = useForm({
		reValidateMode: 'onSubmit'
	})
	const dispatch = useDispatch()
	const history = useHistory()
	const [authError, setAuthError] = useState('')
	const isUserAuthenticated = useSelector(getIsUserAuthenticated)

	const emailRules = {
		required: {
			value: true,
			message: 'Email cannot be empty'
		},
		pattern: {
			value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
			message: 'The email address you entered is invalid'
		}
	}

	const passwordRules = {
		required: {
			value: true,
			message: 'Password cannot be empty'
		},
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			message: 'Password not formatted correctly'
		}
	}

	useEffect(() => {
		if (isUserAuthenticated) {
			history.push('/dashboard')
		}
	}, [isUserAuthenticated])

	const onSubmit = async (data) => {
		const user = {
			email: data.email,
			password: data.password
		}

		try {
			const response = await loginUser(user)
			if (response.data) {
				dispatch(setAuthentication(true))
			}
		} catch (error) {
			setAuthError(error.response.data.message)
		}
	}

	return (
		<div className={'flex justify-center items-center bg-blue-500 h-screen'}>
			<div className={classes.card}>
				<div className={'flex justify-center items-center w-full'}>
					<h2 className={'text-2xl text-center font-bold sm:text-3xl'}>Welcome to Fitness Guardian</h2>
				</div>
				<div className={'flex flex-col justify-evenly items-center h-3/4 w-full'}>
					{authError && <ErrorBar setError={setAuthError} message={authError} />}
					<form className={'flex flex-col justify-evenly items-center h-full w-full'} onSubmit={handleSubmit(onSubmit)}>
						<div className={classes.field}>
							<label>Email</label>
							<input className={classes.textBox} ref={register(emailRules)} type='text' name='email' />
							{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
						</div>
						<div className={classes.field}>
							<label>Password</label>
							<input className={classes.textBox} ref={register(passwordRules)} type='password' name='password' />
							{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
						</div>
						<div className={'w-1/2'}>
							<button className={classes.darkButton} type='submit'>Sign In</button>
						</div>
					</form>
				</div>
				<div className={'flex justify-center w-full h-1/6'}>
					<Link className={classes.blackLink} to='/register'>Not Registered?</Link>
					<Link className={classes.blackLink} style={{ marginLeft: 10 }} to='/forgot'>Forgot Password?</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
