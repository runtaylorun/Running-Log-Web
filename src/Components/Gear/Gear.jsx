import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getUserGear } from '../../Services/gear'

const Gear = () => {
  const [userGear, setUserGear] = useState([])

  useEffect(() => {
    const getGear = async () => {
      try {
        const result = await getUserGear(sessionStorage.getItem('id'))
        setUserGear(result)
      } catch (error) {
        console.log('Error getting user gear', error)
      }
    }

    getGear()
  })

  return (
    <>
      {userGear && userGear.length === 0
        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Looks like you dont have any gear</h1>
            <h2>Click the button below to add some</h2>
            <Link to='/gear/gearForm/0'>
              <Button style={{ backgroundColor: '#1F6FDD', color: 'white' }} size='tiny' icon='plus' />
            </Link>
          </div>
        </div>
        : <div><h1>Gear</h1></div>
      }
    </>
  )
}

export default Gear
