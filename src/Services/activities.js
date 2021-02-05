import axios from 'axios'

export const createActivity = async (activity) => {
  await axios.post('http://localhost:5000/activities', { activity, withCredentials: true })
}

export const getActivities = async (query) => {
  const result = await axios.get('http://localhost:5000/activities', { params: query, withCredentials: true })

  return result
}

export const getActivity = async (activityId) => {
  const result = await axios.get(`http://localhost:5000/activities/${activityId}`, { withCredentials: true })

  return result
}

export const updateActivity = async (activity) => {
  await axios.put(`http://localhost:5000/activities/${activity.activityId}`, { activity })
}
