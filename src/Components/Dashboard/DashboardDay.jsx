import React from 'react'
import classes from '../../CSS/Dashboard/Dashboard.module.css'

const Day = ({ day, activities }) => {



  return (
    <div className={classes.day}>
      <div>
        <h3>{day}</h3>
      </div>
      <div style={{width: '100%'}}>
        {activities.map((activity) => (
          <div className={classes.activity} key={activity.id}>
            <p>{activity.activityTitle}</p>
            <p>{`${activity.distance} mi`}</p>
          </div>
        ))}
      </div>
      <div>
        {`Total: ${activities && activities.length > 0 ? activities.reduce((accumulator, activity) => { return accumulator + activity.distance }, 0) : 0} mi`}
      </div>
    </div>
  )
}

export default Day
