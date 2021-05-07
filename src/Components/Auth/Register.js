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
    <div className={classes.page}>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <h2>Create New Account</h2>
        </div>
        <div className={classes.cardBody}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.inputContainer}>
              <label>Email</label>
              <input ref={register(emailRules)} type='text' name='email' />
              {<p style={{ color: 'red' }}>{errors?.email?.message}</p>}
            </div>
            <div className={classes.inputContainer}>
              <label>First Name</label>
              <input ref={register(nameRules)} type='text' name='firstName' />
              {<p style={{ color: 'red' }}>{errors?.firstName?.message}</p>}
            </div>
            <div className={classes.inputContainer}>
              <label>Last Name</label>
              <input ref={register(nameRules)} type='text' name='lastName' />
              {<p style={{ color: 'red' }}>{errors?.lastName?.message}</p>}
            </div>
            <div className={classes.inputContainer}>
              <label>Password</label>
              <input ref={register(passwordRules)} type='password' name='password' />
              {<p style={{ color: 'red' }}>{errors?.password?.message}</p>}
            </div>
            <div className={classes.inputContainer}>
              <label>Confirm Password</label>
              <input ref={register(passwordConfirmationRules)} type='password' name='passwordConfirmation' />
              {<p style={{ color: 'red' }}>{errors?.passwordConfirmation?.message}</p>}
            </div>
            <div className={classes.formSubmitContainer}>
              <button type='submit'>Register</button>
            </div>
          </form>
        </div>
        <div className={classes.cardFooter}>
          <Link style={{ color: 'black' }} to='/login'>Already Registered?</Link>
          <Link style={{ color: 'black', marginLeft: 10 }} to='/forgot'>Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
