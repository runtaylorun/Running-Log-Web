import React from 'react'
import DashboardWeek from './DashboardWeek'
import classes from '../../CSS/Dashboard/Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={classes.dashboardPage}>
      <DashboardWeek />
    </div>
  )
}

export default Dashboard
