import React, { useEffect, useState } from 'react'
import DashboardWeek from './DashboardWeek'
import Moment from 'moment'
import classes from '../../CSS/Dashboard/Dashboard.module.css'
import { getActivitiesByUserId } from '../../Services/activities'
import { getStartOfCurrentWeekISO, getEndOfCurrentWeekISO } from '../../Lib/time'

const Dashboard = () => {
  const [weeklyActivities, setWeeklyActivities] = useState([])

  useEffect(() => {
    const getActivitiesForCurrentWeek = async () => {
      const userId = sessionStorage.getItem('id')
      const params = {
        startDate: Moment(getStartOfCurrentWeekISO()).format('YYYY-MM-DD'),
        endDate: Moment(getEndOfCurrentWeekISO()).format('yyyy-MM-DD')
      }
      try {
        const results = await getActivitiesByUserId(userId, params)
        if (results) {
          setWeeklyActivities([...results.data])
        }
      } catch (error) {
        console.log('Error fetching activities for this week', error)
      }
    }

    getActivitiesForCurrentWeek()
  }, [])
  return (
    <div className={classes.dashboardPage}>
      <DashboardWeek activities={weeklyActivities}/>
    </div>
  )
}

export default Dashboard
