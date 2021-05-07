import React from 'react'
import DashboardWeek from './DashboardWeek'
import Moment from 'moment'
import classes from './dashboard.module.css'
import GearSummary from './GearSummary'
import MileageSummary from './MileageSummary'
import OffDaySummary from './OffDaySummary'
import useActivities from '../../Hooks/useActivities'
import { getStartOfCurrentWeekISO, getEndOfCurrentWeekISO, getCurrentDate } from '../../Lib/time'

const Dashboard = () => {
  const OFF_DAY = '5'
  const [weeklyActivities] = useActivities({ startDate: Moment(getStartOfCurrentWeekISO()).format('YYYY-MM-DD'), endDate: Moment(getEndOfCurrentWeekISO()).format('yyyy-MM-DD') })
  const [lastOffDay] = useActivities({ type: OFF_DAY, endDate: Moment(getCurrentDate()).format('YYYY-MM-DD'), limit: 1 })

  return (
    <div className={classes.dashboardPage}>
      <DashboardWeek activities={weeklyActivities} />
      <GearSummary />
      <MileageSummary />
      <OffDaySummary offDay={lastOffDay?.[0]} />
    </div>
  )
}

export default Dashboard
