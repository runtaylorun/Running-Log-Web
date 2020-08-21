import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import classes from '../../../CSS/Dashboard/Calendar.module.css'

const RunContainer = ({ title, distance, type, unit, activityId }) => {
  return (
    <div className={classes.runContainer}>
      <h4>{type}</h4>
      <h4>{title}</h4>
      <h4>{`${distance} ${unit}`}</h4>
      <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
        <Link to={`/activityForm/${activityId}`}>
          <Button size='tiny' icon='write' />
        </Link>
        <Button size='tiny' icon='eye' />

      </div>
    </div>
  )
}

export default RunContainer
