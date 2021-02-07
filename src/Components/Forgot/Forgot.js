import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from '../../Services/auth'
import classes from './forgot.module.css'

const Forgot = () => {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit'
  })

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

  const onSubmit = async (data) => {
    try {
      const response = await sendPasswordResetEmail(data.email)
      if (response.data) {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log('There was an error forgetting password', error)
    }
  }

  return (
        <div className={classes.page}>
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h2>Forgot Your Password?</h2>
              <p>Enter you email and we will contact you if your account exists</p>
            </div>
            <div className={classes.cardBody}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.inputContainer}>
                  <label>Email</label>
                  <input ref={register(emailRules)} type='text' name='email' />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <div className={classes.formSubmitContainer}>
                  <button>Submit Request</button>
                </div>
              </form>
            </div>
            <div className={classes.cardFooter}>
              <Link style={{ color: 'black' }} to='/login'>Sign In</Link>
              <Link style={{ color: 'black', marginLeft: 10 }} to='/register'>Create Account</Link>
            </div>
          </div>
        </div>
  )
}

export default Forgot
