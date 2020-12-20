import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Progress } from 'semantic-ui-react'
import classes from './gear.module.css'

const GearCard = ({ gear, size}) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardIconContainer} style={{}}>
        <Icon circular color='blue' size='big' name='heartbeat' />
      </div>
      <div className={classes.cardDetailsContainer}>
        <p>{`${gear.brand} ${gear.model}`}</p>
        <p>{gear.colorway}</p>
        <p>03/05/2000 - Current</p>
      </div>
      <div className={classes.cardProgressContainer}>
        <Progress size='medium' value={gear.miles} total={300} progress='ratio' />
      </div>
    </div>
  )
}

GearCard.propTypes = {
  gear: PropTypes.object
}

export default GearCard
