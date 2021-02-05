import React, { useEffect, useState } from 'react'
import BlankCard from './BlankCard'
import GearCard from './GearCard'
import PageLoader from '../Shared/PageLoader'
import { getGear } from '../../Services/gear'
import classes from './gear.module.css'

const Gear = () => {
  const [userGear, setUserGear] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGear = async () => {
      try {
        const results = await getGear()
        setUserGear(results.data)
        setLoading(false)
      } catch (error) {
        console.log('Error getting user gear', error)
      }
    }

    loadGear()
  }, [])

  return (
    <div className={classes.pageContainer}>
      {loading
        ? <PageLoader label='Loading Gear...' />
        : <div className={classes.body}>
          {userGear?.map((gear, i) => (
            <GearCard key={i} gear={gear} />
          ))}
        <BlankCard />
        </div>
      }
    </div>
  )
}
export default Gear
