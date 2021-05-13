import { useState, useEffect } from 'react'
import { getGear, deleteGear as deleteGearAPI } from '../Services/gear'

function useGear ({ startDate, endDate, limit }) {
  const [gear, setGear] = useState()

  const loadGear = async () => {
    try {
      const results = await getGear({
        startDate,
        endDate,
        limit
      })

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
