import React from 'react'
import classes from './dashboard.module.css'

const Day = ({ day, activities, date }) => {
  return (
    <div className={classes.day}>
      <div>
        <h3 style={{fontWeight: 400}}>{day}</h3>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        {activities.map((activity) => (
          <div className={classes.activity} key={activity.id}>
            <p>{activity.activityTitle}</p>
            <p>{`${activity.distance} mi`}</p>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <a style={{marginBottom: 5}} href={`/activityForm/${date.substring(0,2)}/${date.substring(3,5)}/${date.substring(6,8)}`}>New</a>
        <p>{`Total: ${activities && activities.length > 0 ? activities.reduce((accumulator, activity) => { return accumulator + activity.distance }, 0) : 0} mi`}</p>
      </div>
    </div>
  )
}

export default Day
