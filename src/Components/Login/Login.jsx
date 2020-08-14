import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/Actions/user'
import classes from '../../CSS/Login/Login.module.css'
import { authenticateUser } from '../../Services/auth'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const login = async (event) => {
    event.preventDefault()

    const user = {
      email,
      password
    }

    try {
      const response = await authenticateUser(user)
      if (response.data) {
        console.log('Log in successfull', response)
        dispatch(setUser({ isAuthenticated: true, userId: response.data.userId }))
        history.push('/dashboard')
      }
    } catch (error) {
      console.log('There was an error loggin in', error)
    }
  }

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginContainer}>
        <h2>Login</h2>
        <form>
          <div className={classes.inputContainer}>
            <label>Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type='text' name='email' />
          </div>
          <div className={classes.inputContainer}>
            <label>Password</label>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type='password' name='password' />
          </div>
          <div className={classes.inputContainer}>
            <button onClick={login}>Sign In</button>
          </div>
          <div>
            <Link style={{ color: 'black' }} to='/register'>Not Registered?</Link>
            <Link style={{ color: 'black', marginLeft: 10 }} to='/forgot'>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
