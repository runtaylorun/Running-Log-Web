import React from 'react'
import ViewHeader from './ViewHeader'
import GearCard from '../Gear/GearCard'
import DataSlot from './DataSlot'
import { calculatePacePerMile } from '../../Lib/pace'
import { HMStoSeconds, secondsToHourMinuteSeconds } from '../../Lib/time'
import { roundTo2 } from '../../Lib/conversions'
import { useParams } from 'react-router-dom'
import classes from './activity.module.css'
import useActivity from '../../Hooks/useActivity'

const ActivityView = () => {
  const { activityId } = useParams()

  const [activity] = useActivity(activityId)

  return (
    <div className={classes.activityViewPage}>
      <ViewHeader date='10-04-2020' title='Medium Long Run' />
      <div className={classes.gearArea}>
        <GearCard gear={
          {
            brand: 'Nike',
            model: 'Pegasus 37',
            colorway: 'Midnight City',
            miles: 150
          }
        }
        />
      </div>
      <div className={classes.mainArea}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '75%' }}>
          <DataSlot label='Distance' data={`${roundTo2(activity.distance)} ${activity.distanceUnit}`} />
          <DataSlot label='Time' data={secondsToHourMinuteSeconds(HMStoSeconds(activity?.hours, activity?.minutes, activity?.seconds)) } />
          <DataSlot label='Pace per Mi' data={calculatePacePerMile(activity?.hours, activity?.minutes, activity?.seconds, activity.distance, 'Mi')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '75%', border: '1px solid black', borderRadius: 5, height: '70%' }}>
          <h2>Map Unavailable</h2>
        </div>
      </div>
    </div>
  )
}

export default ActivityView
