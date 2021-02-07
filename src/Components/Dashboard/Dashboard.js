import React, { useEffect, useState } from 'react'
import DashboardWeek from './DashboardWeek'
import Moment from 'moment'
import classes from './dashboard.module.css'
import { getActivities } from '../../Services/activities'
import { getStartOfCurrentWeekISO, getEndOfCurrentWeekISO } from '../../Lib/time'

const Dashboard = () => {
  const [weeklyActivities, setWeeklyActivities] = useState([])
  useEffect(() => {
    const getActivitiesForCurrentWeek = async () => {
      const params = {
        startDate: Moment(getStartOfCurrentWeekISO()).format('YYYY-DD-MM'),
        endDate: Moment(getEndOfCurrentWeekISO()).format('yyyy-DD-MM')
      }
      try {
        const results = await getActivities(params)
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
