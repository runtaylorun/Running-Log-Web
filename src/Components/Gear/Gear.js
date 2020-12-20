import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import GearCard from './GearCard'
import { getUserGear } from '../../Services/gear'
import classes from './gear.module.css'

const Gear = () => {
  const [userGear, setUserGear] = useState([])

  useEffect(() => {
    const loadGear = async () => {
      try {
        const results = await getUserGear(sessionStorage.getItem('id'))
        setUserGear(results.data)
      } catch (error) {
        console.log('Error getting user gear', error)
      }
    }

    loadGear()
  })

  return (
    <div className={classes.pageContainer}>
      <div className={classes.header}>
        <a href='/gear/gearForm/0'>Add New Gear</a>
      </div>
      <div className={classes.body}>
        <GearCard key={1}  gear={{
              brand: 'Nike',
              model: 'Pegasus 37',
              colorway: 'Midnight City',
              miles: 150,
            }}/>
        <GearCard key={2}  gear={{
              brand: 'Nike',
              model: 'Pegasus 37',
              colorway: 'Midnight City',
              miles: 150,
            }}/>
        <GearCard key={3}  gear={{
              brand: 'Nike',
              model: 'Pegasus 37',
              colorway: 'Midnight City',
              miles: 150,
            }}/>
      </div>

      {/* {userGear && userGear.length === 0
        ? <div className={classes.noGearContainer}>
            <h1>Looks like you dont have any gear</h1>
            <h2>Click the button below to add some</h2>
            <Link to='/gear/gearForm/0'>
              <Button style={{ backgroundColor: '#1F6FDD', color: 'white' }} size='tiny' icon='plus' />
              </Link>
          </div>
        : <div className={classes.gearCardsContainer}>
          {userGear.map((gear, i) => (
            <GearCard key={i} gear={gear} />
          ))}
        </div>
      } */}
      
    </div>
  )
}

export default Gear
