import React from 'react'
import classes from './dashboard.module.css'
import { Line } from 'react-chartjs-2'

const MileageSummary = () => {
  const data = {
    labels: ['02/01/21', '02/08/21', '02/15/21', '02/22/21', '03/01/21'],
    datasets: [
      {
        label: 'Weekly Milage',
        fill: false,
        lineTension: 0.5,
        borderColor: 'hsl(215, 100%, 50%)',
        pointRadius: 5,
        pointBorderColor: 'hsl(215, 100%, 50%)',
        pointBackgroundColor: 'hsl(215, 100%, 50%)',
        pointHitRadius: 10,
        data: [90, 90, 80, 85, 90]
      }
    ]
  }

  return (
        <div className={classes.mileageContainer}>
            <h2 style={{ fontWeight: 400, margin: '0 0 10px 0' }}>Mileage Past 5 Weeks</h2>
            <Line data={data} />
        </div>
  )
}

export default MileageSummary
