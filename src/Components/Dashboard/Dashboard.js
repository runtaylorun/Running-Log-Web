import React, { useEffect, useState } from 'react'
import DashboardWeek from './DashboardWeek'
import Moment from 'moment'
import classes from './dashboard.module.css'
import GearSummary from './GearSummary'
import MileageSummary from './MileageSummary'
import OffDaySummary from './OffDaySummary'
import { getActivities } from '../../Services/activities'
import { getStartOfCurrentWeekISO, getEndOfCurrentWeekISO } from '../../Lib/time'

const Dashboard = () => {
  const [weeklyActivities, setWeeklyActivities] = useState([])
  useEffect(() => {
    const getActivitiesForCurrentWeek = async () => {
      const params = {
        startDate: Moment(getStartOfCurrentWeekISO()).format('YYYY-MM-DD'),
        endDate: Moment(getEndOfCurrentWeekISO()).format('yyyy-MM-DD')
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
        <GearSummary />
        <MileageSummary />
        <OffDaySummary />
    </div>
  )
}

export default Dashboard
