import React from 'react'
import { Icon } from 'semantic-ui-react'
import classes from './settings.module.css'

const Settings = () => {
  return (
    <div className={classes.page}>
      <div className={classes.formContainer}>
        <div className={classes.profilePicContainer}>
          <Icon size='massive' name='user circle icon' />
          <div className={classes.profilePicLabels}>
            <button className={classes.button}>Upload Profile Picture</button>
            <p>Must be jpg no larger than 1MB</p>
          </div>
        </div>
        <div className={classes.inputContainer}>
            <label>First Name</label>
            <input disabled className={classes.textbox} defaultValue='Taylor' />
        </div>
        <div className={classes.inputContainer}>
            <label>Last Name</label>
            <input disabled className={classes.textbox} defaultValue='Mills' />

        </div>
        <div className={classes.inputContainer}>
            <label>Email</label>
            <input className={classes.textbox} defaultValue='taylormills190@gmail.com' disabled />
        </div>
        <div className={classes.inputContainer}>
            <label>Measurement System</label>
            <select className={classes.select}>
              <option>Imperial</option>
              <option>Metric</option>
            </select>
        </div>
        <div className={classes.formButtons}>
          <button className={classes.button}>Save Changes</button>
          <button className={classes.button}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
