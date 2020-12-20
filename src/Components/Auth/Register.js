import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './register.module.css';

const Register = () => {

  const [formData, setFormData] = useState({})

  const handleValueChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <h2>Create New Account</h2>
        </div>
        <div className={classes.cardBody}>
          <form>
            <div className={classes.inputContainer}>
              <label>Email</label>
              <input onChange={handleValueChange} type='text' name='email' />
            </div>
            <div className={classes.inputContainer}>
              <label>Password</label>
              <input onChange={handleValueChange} type='password' name='password' />
            </div>
            <div className={classes.inputContainer}>
              <label>Confirm Password</label>
              <input onChange={handleValueChange} type='password' name='passwordConfirmation' />
            </div>
            <div className={classes.formSubmitContainer}>
              <button>Sign In</button>
            </div>
          </form>
        </div>
        <div className={classes.cardFooter}>
          <Link style={{ color: 'black' }} to='/login'>Already Registered?</Link>
          <Link style={{ color: 'black', marginLeft: 10 }} to='/forgot'>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
