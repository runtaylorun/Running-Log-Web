import React from 'react'
import {Icon} from 'semantic-ui-react'
import classes from './settings.module.css'

const Settings = () => {
  return (
    <div className={classes.page}>
      <div className={classes.formContainer}>
        <div className={classes.inputContainer}>
          <label>Profile Picture</label>
          <Icon size='massive' name='user circle icon' />
          <div>
            <button>Upload Profile Picture</button>
          </div>
        </div>
        <div className={classes.inputContainer}>
            <label>First Name</label>
            <input defaultValue='Taylor' />
        </div>
        <div className={classes.inputContainer}>
            <label>Last Name</label>
            <input defaultValue='Mills' />

        </div>
        <div className={classes.inputContainer}>
            <label>Email</label>
            <input defaultValue='taylormills190@gmail.com' disabled />
        </div>
        <div className={classes.inputContainer}>
            <label>Password</label>
            <button>Reset Password</button>
        </div>
        <div className={classes.inputContainer}>
            <label>Measurement System</label>
            <select>
              <option>Imperial</option>
              <option>Metric</option>

            </select>
        </div>
      </div>
    </div>
  )
}

export default Settings
