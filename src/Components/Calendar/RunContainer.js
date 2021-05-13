import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { distanceUnits, convertToUserMeasurementSystem, roundTo2 } from '../../Lib/conversions'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'

import classes from './calendar.module.css'

const RunContainer = ({ title, distance, type, unit, activityId }) => {
  const measurementSystem = useSelector(getUserMeasurementSystem)
  return (
    <div className={classes.runContainer}>
      <h4>{type}</h4>
      <h4>{title}</h4>
      <h4>{`${roundTo2(convertToUserMeasurementSystem(unit, distance, measurementSystem))} ${distanceUnits[measurementSystem]}`}</h4>
      <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
        <Link to={`/activityForm/${activityId}`}>
          <Button size='tiny' icon='write' />
        </Link>
        <Link to={`/activityView/${activityId}`}>
          <Button size='tiny' icon='eye' />
        </Link>
      </div>
    </div>
  )
}

export default RunContainer
