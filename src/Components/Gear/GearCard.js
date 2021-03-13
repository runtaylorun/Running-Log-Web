import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Progress } from 'semantic-ui-react'
import { formatDateMMDD } from '../../Lib/time'
import classes from './gear.module.css'

const GearCard = ({ gear, size }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardIconContainer} style={{}}>
        <Icon circular color='blue' size='big' name='heartbeat' />
      </div>
      <div className={classes.cardDetailsContainer}>
        <p>{`${gear.brand} ${gear.model}`}</p>
        <p>{gear.colorway}</p>
        <p>{formatDateMMDD(gear?.dateAdded)} - Current</p>
      </div>
      <div className={classes.cardProgressContainer}>
        <Progress size='medium' value={gear.miles} total={gear.maxMiles} label={`${gear.miles} / ${gear.maxMiles} Mi`} />
      </div>
    </div>
  )
}

GearCard.propTypes = {
  gear: PropTypes.object
}

export default GearCard
