import axios from 'axios'

export const getGear = async (query) => {
	return await axios.get('http://localhost:5000/gear', { params: query, withCredentials: true })
}

export const getGearById = async (gearId) => {
	return await axios.get(`http://localhost:5000/gear/${gearId}`, { withCredentials: true })
}

export const patchGear = async (gearId, changes) => {
	return await axios.patch(`http://localhost:5000/gear/${gearId}`, { changes }, { withCredentials: true })
}

export const updateGear = async (gear) => {
	return await axios.put('http://localhost:5000/gear', { gear }, { withCredentials: true })
}

export const postGear = async (gear) => {
	return await axios.post('http://localhost:5000/gear', { gear }, { withCredentials: true })
}

export const deleteGear = async (gearId) => {
	return await axios.delete(`http://localhost:5000/gear/${gearId}`, { withCredentials: true })
}
