import { useState, useEffect } from 'react'
import { getGear, deleteGear as deleteGearAPI } from '../Services/gear'

function useGear () {
  const [gear, setGear] = useState()

  const loadGear = async () => {
    try {
      const results = await getGear()

      setGear(results?.data ?? [])
    } catch (error) {
      console.log('Error getting user gear', error)
    }
  }

  const deleteGear = async (gearId) => {
    try {
      await deleteGearAPI(gearId)
    } catch (error) {
      console.log('Error deleting gear', error)
    }
  }

  useEffect(() => {
    loadGear()
  }, [])

  return [gear, deleteGear]
}

export default useGear
