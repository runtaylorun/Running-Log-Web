import React from 'react'
import { Icon } from 'semantic-ui-react'
import GearCard from '../Gear/GearCard'
import classes from '../../CSS/Activity/ActivityView.module.css'

const ViewHeader = ({ title, date }) => {
  return (
        <div className={classes.activityHeader}>
            <div className={classes.headerGroup1}>
                <h1>{title}</h1>
                <Icon style={{ marginLeft: 15, marginTop: 5 }} name='bicycle' circular />
            </div>
            <div className={classes.headerGroup2}>
                <p style={{ fontSize: '14px' }}>{date}</p>
            </div>
        </div>
  )
}

export default ViewHeader