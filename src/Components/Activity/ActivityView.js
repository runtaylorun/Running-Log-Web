import React, { useEffect, useState } from 'react'
import ViewHeader from './ViewHeader'
import GearCard from '../Gear/GearCard'
import DataSlot from './DataSlot'
import { getActivity } from '../../Services/activities'
import { calculatePacePerMile } from '../../Lib/pace'
import { useParams } from 'react-router-dom'
import classes from './activity.module.css'
import { act } from 'react-dom/test-utils'

const ActivityView = () => {
  const { activityId } = useParams()

  const [activity, setActivity] = useState({})

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const result = await getActivity(activityId)

        setActivity(result?.data[0] ?? {})
      } catch (error) {
        console.log('Error getting activity', error)
      }
    }

    loadActivity()
  }, [])

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
        }/>
      </div>
      <div className={classes.mainArea}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '75%' }}>
          <DataSlot label='Distance' data={`${activity.distance} ${activity.distanceUnit}`} />
          <DataSlot label='Time' data={activity.elapsedTime} />
          <DataSlot label='Pace per Mi' data={calculatePacePerMile(activity.elapsedTime, activity.distance, 'Mi')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '75%', border: '1px solid black', borderRadius: 5, height: '70%' }}>
          <h2>Map Unavailable</h2>
        </div>
      </div>
    </div>
  )
}

export default ActivityView
