import axios from 'axios'

export const createActivity = async (activity) => {
  const result = await axios.post('http://localhost:5000/activity', { activity })

  console.log('Activity post request result', result)
}

export const getActivitiesByUserId = async (userId, query) => {
  const result = await axios.get(`http://localhost:5000/activity/${userId}`, { params: query })

  return result
}

export const getActivityByActivityId = async (userId, activityId) => {
  const result = await axios.get(`http://localhost:5000/activity/${userId}/${activityId}`)

  return result
}

export const updateActivity = async (activity) => {
  await axios.put(`http://localhost:5000/activity/${activity.activityId}`, { activity })
}
