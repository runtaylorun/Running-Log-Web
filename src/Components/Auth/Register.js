/* eslint-disable no-control-regex */
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { postUser } from '../../Services/auth'
import classes from './register.module.css'

const Register = () => {
	const { register, handleSubmit, errors, watch } = useForm({
		reValidateMode: 'onSubmit'
	})
	const history = useHistory()

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

	const nameRules = {
		required: 'Field Required',
		pattern: {
			value: /^[a-zA-Z0-9äöüÄÖÜ ]*$/,
			message: 'Title cannot contain special characters'
		},
		maxLength: {
			value: 45,
			message: 'Field must be less than 45 characters'
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

	const passwordConfirmationRules = {
		...passwordRules,
		validate: {
			value: (value) => value === watch('password') || 'Passwords do not match'
		}
	}

	const onSubmit = async (data) => {
		const user = {
			email: data.email,
			password: data.password,
			firstName: data?.firstName,
			lastName: data?.lastName
		}

		try {
			const response = await postUser(user)
			if (response.data) {
				history.push('/login')
			}
		} catch (error) {
			console.log('There was an error registering', error)
		}
	}

	return (
		<div className={'flex justify-center items-center bg-blue-500 h-screen'}>
			<div className={classes.card}>
				<div className={'flex justify-center items-center w-full h-1/6'}>
					<h2 className={'font-bold text-center text-3xl'}>Create New Account</h2>
				</div>
				<div className={'flex flex-col justify-evenly items-center h-3/4 w-full'}>
					<form className={'flex flex-col items-center justify-evenly w-full h-full'} onSubmit={handleSubmit(onSubmit)}>
						<div className={classes.field}>
							<label>Email</label>
							<input className={classes.textBox} ref={register(emailRules)} type='text' name='email' />
							{<p style={{ color: 'red' }}>{errors?.email?.message}</p>}
						</div>
						<div className={classes.field}>
							<label>First Name</label>
							<input className={classes.textBox} ref={register(nameRules)} type='text' name='firstName' />
							{<p style={{ color: 'red' }}>{errors?.firstName?.message}</p>}
						</div>
						<div className={classes.field}>
							<label>Last Name</label>
							<input className={classes.textBox} ref={register(nameRules)} type='text' name='lastName' />
							{<p style={{ color: 'red' }}>{errors?.lastName?.message}</p>}
						</div>
						<div className={classes.field}>
							<label>Password</label>
							<input className={classes.textBox} ref={register(passwordRules)} type='password' name='password' />
							{<p style={{ color: 'red' }}>{errors?.password?.message}</p>}
						</div>
						<div className={classes.field}>
							<label>Confirm Password</label>
							<input className={classes.textBox} ref={register(passwordConfirmationRules)} type='password' name='passwordConfirmation' />
							{<p style={{ color: 'red' }}>{errors?.passwordConfirmation?.message}</p>}
						</div>
						<div className={'w-1/2'}>
							<button className={classes.darkButton} type='submit'>Register</button>
						</div>
					</form>
				</div>
				<div className={'flex justify-center w-full'}>
					<Link className={classes.blackLink} to='/login'>Already Registered?</Link>
					<Link className={classes.blackLink} style={{ marginLeft: 10 }} to='/forgot'>Forgot Password?</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
