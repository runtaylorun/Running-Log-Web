import React, { useEffect, useState } from 'react'
import ComingSoon from '../Shared/ComingSoon'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getActivitiesByUserId } from '../../Services/activities'
import classes from '../../CSS/History/History.module.css'

const History = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const results = await getActivitiesByUserId(sessionStorage.getItem('id'))

        setActivities(results?.data)
      } catch (error) {
        console.log('Error getting history', error)
      }
    }

    loadActivities()
  }, [])
  return (
        <div className={classes.historyPageContainer}>
          <table className={classes.historyTable}>
            <tr className={classes.historyTableHeader}>
              <th>Date</th>
              <th>Type</th>
              <th>Title</th>
              <th>Distance</th>
              <th>Pace</th>
              <th>Action</th>
            </tr>
                {activities.map((activity) => (
                  <tr>
                  <td>{activity.date}</td>
                  <td>{activity.type}</td>
                  <td>{activity.activityTitle}</td>
                  <td>{activity.distance}</td>
                  <td>3:52</td>
                  <td><Link to={`/activityView/${activity.activityId}`}>
          <Button size='tiny' icon='eye' />
        </Link></td>
                  </tr>
                ))}
          </table>
        </div>
  )
}

export default History
