import axios from 'axios'

export const getGear = async () => {
  return await axios.get('http://localhost:5000/gear', { withCredentials: true })
}

export const getGearById = async (gearId) => {
  return await axios.get(`http://localhost:5000/gear/${gearId}`, { withCredentials: true })
}

export const updateGear = async (gear) => {
  return await axios.put('http://localhost:5000/gear', { gear }, { withCredentials: true })
}

export const createGear = async (gear) => {
  return await axios.post('http://localhost:5000/gear', { gear }, { withCredentials: true })
}

export const deleteGear = async (gearId) => {
  return await axios.delete(`http://localhost:5000/gear/${gearId}`, { withCredentials: true })
}
