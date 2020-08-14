import axios from 'axios'

export const createActivity = async (activity) => {
  const result = await axios.post('http://localhost:5000/activity', { activity })

  console.log('Activity post request result', result)
}
