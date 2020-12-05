import React, { useEffect, useState } from 'react'
import ViewHeader from './ViewHeader'
import DataSlot from './DataSlot'
import { getActivityByActivityId } from '../../Services/activities'
import { Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import classes from '../../CSS/Activity/ActivityView.module.css'

const ActivityView = () => {
  const { activityId } = useParams()

  const [activity, setActivity] = useState({})
  console.log(activity)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const result = await getActivityByActivityId(sessionStorage.getItem('id'), activityId)

        setActivity(result?.data[0] ?? [])
      } catch (error) {
        console.log('Error getting activity', error)
      }
    }

    loadActivity()
  })
  return (
        <div className={classes.activityViewPage}>
              <ViewHeader date={activity.date} title={activity.activityTitle} />
            <div className={classes.gearArea}>

            </div>
            <div className={classes.mainArea}>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '75%' }}>
                <DataSlot label='Distance' data={`${activity.distance} Mi`} />
                <DataSlot label='Pace per KM' data='5:20' />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '75%', border: '1px solid black', height: '70%' }}>
                <h2>Map Unavailable</h2>
              </div>
            </div>
        </div>
  )
}

export default ActivityView
