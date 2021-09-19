import { secondsToHourMinuteSeconds, HMStoSeconds } from './time'

export const calculatePacePerMile = (hours = 0, minutes = 0, seconds = 0, distance, distanceUnit) => {
	const timeInSeconds = HMStoSeconds(hours, minutes, seconds)

	if (distanceUnit === 'Km') {
		const convertedDistance = distance / 1.609344
		const averageSecondsPerMile = timeInSeconds / convertedDistance
		return secondsToHourMinuteSeconds(averageSecondsPerMile)
	} else {
		const averageSecondsPerMile = timeInSeconds / distance
		return secondsToHourMinuteSeconds(averageSecondsPerMile)
	}
}

export const calculatePacePerKilometer = (hours = 0, minutes = 0, seconds = 0, distance, distanceUnit) => {
	const timeInSeconds = HMStoSeconds(hours, minutes, seconds)

	if (distanceUnit === 'Mi') {
		const convertedDistance = distance * 1.609344
		const averageSecondsPerMile = timeInSeconds / convertedDistance
		return secondsToHourMinuteSeconds(averageSecondsPerMile)
	} else {
		const averageSecondsPerMile = timeInSeconds / distance
		return secondsToHourMinuteSeconds(averageSecondsPerMile)
	}
}
