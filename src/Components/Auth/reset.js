import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { checkResetToken, resetPassword } from '../../Services/auth'
import classes from './reset.module.css'

const Reset = () => {
	const { register, handleSubmit, errors, watch } = useForm({
		reValidateMode: 'onSubmit'
	})
	const history = useHistory()
	const { token } = useParams()

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

	useEffect(() => {
		const validateToken = async () => {
			try {
				await checkResetToken(token)
			} catch (error) {
				if (!error.response.data.valid) {
					history.push('/login')
				}
				console.log('error checking restet token', error)
			}
		}

		validateToken()
	}, [])

	const onSubmit = async (data) => {
		try {
			const response = await resetPassword(token, data.password)

			if (response.data) {
				history.push('/login')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={classes.page}>
			<div className={classes.card}>
				<div className={classes.cardHeader}>
					<h2>Enter your new password</h2>
				</div>
				<div className={classes.cardBody}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={classes.inputContainer}>
							<label>New Password</label>
							<input className={classes.textBox} ref={register(passwordRules)} type='password' name='password' />
							{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
						</div>
						<div className={classes.inputContainer}>
							<label>Confirm New Password</label>
							<input className={classes.textBox} ref={register(passwordConfirmationRules)} type='password' name='passwordConfirmation' />
							{errors.passwordConfirmation && <p style={{ color: 'red' }}>{errors.passwordConfirmation.message}</p>}
						</div>
						<div className={classes.formSubmitContainer}>
							<button>Submit Request</button>
						</div>
					</form>
				</div>
				<div className={classes.cardFooter}>
				</div>
			</div>
		</div>
	)
}

export default Reset
