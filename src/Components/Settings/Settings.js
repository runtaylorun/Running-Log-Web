import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { getUserDetails, updateUserDetail } from '../../Services/user'
import { getUserMeasurementSystem} from '../../Redux/Reducers/selectors.jsx'
import { setMeasurementSystem as setMeasurementSystemRedux } from '../../Redux/Actions/user'
import classes from './settings.module.css'

const Settings = () => {
  const [userDetails, setUserDetails] = useState({})
  const [measurementSystem, setMeasurementSystem] = useState(useSelector(getUserMeasurementSystem))

  const dispatch = useDispatch()

  const noChangesMade = measurementSystem === userDetails?.measurementSystem

  const loadUserDetails = async () => {
    try {
      const results = await getUserDetails()

      setUserDetails(results?.data)
      setMeasurementSystem(results?.data?.measurementSystem)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUserDetails()
  }, [])

  const saveHandler = async () => {
    try {
      const result = await updateUserDetail({
        measurementSystem
      })

      if (result) {
        dispatch(setMeasurementSystemRedux(measurementSystem))
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resetHandler = () => {
    setMeasurementSystem(userDetails?.measurementSystem)
  }

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
            <input disabled className={classes.textbox} value={userDetails?.firstName} />
        </div>
        <div className={classes.inputContainer}>
            <label>Last Name</label>
            <input disabled className={classes.textbox} value={userDetails?.lastName} />

        </div>
        <div className={classes.inputContainer}>
            <label>Email</label>
            <input className={classes.textbox} value={userDetails?.email} disabled />
        </div>
        <div className={classes.inputContainer}>
            <label>Measurement System</label>
            <select onChange={(e) => setMeasurementSystem(e.target.value)} value={measurementSystem} className={classes.select}>
              <option value='Metric'>Metric</option>
              <option value='Imperial'>Imperial</option>
            </select>
        </div>
        <div className={classes.formButtons}>
          <button onClick={saveHandler} disabled={noChangesMade} className={classes.button}>Save Changes</button>
          <button onClick={resetHandler} className={classes.button}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
