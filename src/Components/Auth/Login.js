import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsUserAuthenticated } from '../../Redux/Reducers/selectors'
import { setUser } from '../../Redux/Actions/user'
import classes from './login.module.css'
import { authenticateUser } from '../../Services/auth'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isUserAuthenticated = useSelector(getIsUserAuthenticated)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (isUserAuthenticated) {
      history.push('/dashboard')
    }
  }, [])

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
        sessionStorage.setItem('id', response.data.userId)
        dispatch(setUser({ isAuthenticated: true, userId: response.data.userId }))
        history.push('/dashboard')
      }
    } catch (error) {
      console.log('There was an error loggin in', error)
    }
  }

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <h2>Welcome to Fitness Guardian</h2>
        </div>
        <div className={classes.cardBody}>
          <form>
              <div className={classes.inputContainer}>
              <label>Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type='text' name='email' />
            </div>
            <div className={classes.inputContainer}>
              <label>Password</label>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type='password' name='password' />
            </div>
            <div className={classes.formSubmitContainer}>
              <button onClick={login}>Sign In</button>
            </div>
          </form>
        </div>
        <div className={classes.cardFooter}>
          <Link style={{ color: 'black' }} to='/register'>Not Registered?</Link>
          <Link style={{ color: 'black', marginLeft: 10 }} to='/forgot'>Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
