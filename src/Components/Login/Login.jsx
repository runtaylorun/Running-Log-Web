import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/Actions/user'
import classes from '../../CSS/Login/Login.module.css'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const login = (event) => {
    event.preventDefault()

    dispatch(setUser({ isAuthenticated: true }))
    history.push('/calendar')
  }

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginContainer}>
        <h2>Login</h2>
        <form>
          <div className={classes.inputContainer}>
            <label>Email</label>
            <input type='text' name='email' />
          </div>
          <div className={classes.inputContainer}>
            <label>Password</label>
            <input type='password' name='password' />
          </div>
          <div className={classes.inputContainer}>
            <button onClick={login}>Sign In</button>
          </div>
          <div>
            <Link to='/register'>Not Registered?</Link>
            <Link to='/forgot'>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
