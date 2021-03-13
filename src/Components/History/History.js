import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { calculatePacePerMile } from '../../Lib/pace'
import { getActivities } from '../../Services/activities'
import classes from './history.module.css'

const History = () => {
  /* const runs = [
    {
      date: '11-04-20',
      type: 'Run',
      activityTitle: 'Easy Run',
      distance: 8,
      activityId: 1
    },
    {
      date: '11-08-20',
      type: 'Run',
      activityTitle: 'Long Run',
      distance: 15,
      activityId: 2
    },
    {
      date: '11-09-20',
      type: 'Run',
      activityTitle: 'Long Fartlek',
      distance: 9,
      activityId: 3
    },
    {
      date: '11-10-20',
      type: 'Run',
      activityTitle: 'Easy Run',
      distance: 7,
      activityId: 4
    },
    {
      date: '11-11-20',
      type: 'Run',
      activityTitle: 'Tempo',
      distance: 10,
      activityId: 5
    },
    {
      date: '11-12-20',
      type: 'Run',
      activityTitle: 'Easy Run',
      distance: 7,
      activityId: 6
    },
    {
      date: '11-13-20',
      type: 'Run',
      activityTitle: 'Medium Long Run',
      distance: 14,
      activityId: 7
    },
    {
      date: '11-14-20',
      type: 'Run',
      activityTitle: 'Recovery Run',
      distance: 6,
      activityId: 8
    },
    {
      date: '11-15-20',
      type: 'Run',
      activityTitle: 'Recovery Run',
      distance: 10,
      activityId: 9
    },
    {
      date: '11-16-20',
      type: 'Run',
      activityTitle: 'Hill Repeats',
      distance: 4.5,
      activityId: 10
    },
    {
      date: '11-17-20',
      type: 'Run',
      activityTitle: 'Easy Run',
      distance: 7,
      activityId: 11
    },
    {
      date: '11-18-20',
      type: 'Run',
      activityTitle: 'Warmup',
      distance: 3,
      activityId: 12
    },
    {
      date: '11-19-20',
      type: 'Run',
      activityTitle: 'Cooldown',
      distance: 3,
      activityId: 13
    }
  ] */

  const [activities, setActivities] = useState([])

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const results = await getActivities()

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
              <th style={{ textAlign: 'right' }}>Distance</th>
              <th style={{ textAlign: 'right' }}>Pace</th>
              <th>Action</th>
            </tr>
                {activities.map((activity) => (
                  <tr key={activity.activityId} className={classes.tableBodyRow}>
                  <td>{activity.date}</td>
                  <td>{activity.type}</td>
                  <td>{activity.title}</td>
                  <td style={{ textAlign: 'right' }}>{`${activity.distance} Mi`}</td>
                  <td style={{ textAlign: 'right' }}>{calculatePacePerMile(activity.elapsedTime, activity.distance, 'Mi')}</td>
                  <td><a href={`/activityView/${activity.id}`}>View</a></td>
                  </tr>
                ))}
          </table>
        </div>
  )
}

export default History
