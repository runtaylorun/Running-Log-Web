import { useState, useEffect } from 'react'
import { getActivity } from '../Services/activities'


function useActivity (activityId) {
  const [activity, setActivity] = useState({})

  const loadActivity = async () => {
    try {
      const result = await getActivity(activityId)

      setActivity(result?.data[0] ?? {})
    } catch (error) {
      console.log('Error getting activity', error)
    }
  }

  useEffect(() => {
    loadActivity()
  }, [activityId])

  return [activity]
}

export default useActivity
