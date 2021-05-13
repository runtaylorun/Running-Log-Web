import { useState, useEffect } from 'react'
import { getActivities } from '../Services/activities'

function useActivities ({ startDate, endDate, month, year, limit, offset, searchTerm, column, sortDirection }) {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pages, setPages] = useState(0)
  const [count, setCount] = useState(0)

  const loadActivities = async () => {
    try {
      const results = await getActivities({
        startDate,
        endDate,
        month,
        year,
        limit,
        offset,
        searchTerm,
        column,
        sortDirection
      })

      setActivities(results?.data?.activities)
      setPages(results?.data?.pages)
      setCount(results?.data?.count)
      setIsLoading(false)
    } catch (error) {
      console.log('Error getting history', error)
    }
  }

  useEffect(() => {
    loadActivities()
  }, [startDate, endDate, month, year, limit, offset, searchTerm, column, sortDirection])

  return [activities, pages, count, isLoading, setIsLoading]
}

export default useActivities
