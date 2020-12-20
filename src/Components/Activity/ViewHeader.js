import React from 'react'
import { Icon } from 'semantic-ui-react'
import classes from './activity.module.css'

const ViewHeader = ({ title, date }) => {
    return (
        <div className={classes.activityHeader}>
            <div className={classes.headerGroup1}>
                <h1 style={{fontWeight: 400}}>{title}</h1>
                <Icon style={{ marginLeft: 15, marginTop: 5 }} name='blind' circular />
            </div>
            <div className={classes.headerGroup2}>
                <p style={{ fontSize: '14px' }}>{date}</p>
            </div>
        </div>
    )
}

export default ViewHeader
