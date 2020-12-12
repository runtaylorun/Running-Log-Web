import React, { useState } from 'react'
import classes from './register.module.css'

const Register = () => {
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
                        <input type='text' name='email' />
                        </div>
                        <div className={classes.inputContainer}>
                        <label>Password</label>
                        <input type='password' name='password' />
                        </div>
                        <div className={classes.formSubmitContainer}>
                        <button>Sign In</button>
                        </div>
                    </form>
                    </div>
                    <div className={classes.cardFooter}>
                    </div>
                </div>
        </div>
  )
}

export default Register
