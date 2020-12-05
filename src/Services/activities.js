import axios from 'axios'

export const createActivity = async (activity) => {
  await axios.post('http://localhost:5000/activity', { activity })
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
