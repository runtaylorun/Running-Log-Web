import axios from 'axios'

export const postActivity = async (activity) => {
  return await axios.post('http://localhost:5000/activities', { activity }, { withCredentials: true })
}

export const getActivities = async (query) => {
  return await axios.get('http://localhost:5000/activities', { params: query, withCredentials: true })
}

export const getActivity = async (activityId) => {
  return await axios.get(`http://localhost:5000/activities/${activityId}`, { withCredentials: true })
}

export const putActivity = async (activity) => {
  return await axios.put(`http://localhost:5000/activities/${activity.id}`, { activity })
}
