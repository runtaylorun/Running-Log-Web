import Moment from 'moment'

export const calculatePacePerMile = (time, distance) => {
  const timeInSeconds = timeToSeconds(time)
  console.log('Time in seconds', timeInSeconds)

  if (distance.unit === 'Km') {

  } else {
    const averageSecondsPerMile = timeInSeconds * distance
    console.log('Average seconds per mile', averageSecondsPerMile)
  }
}

export const calculatePacePerKilometer = (time, distance) => {
  const timeInSeconds = timeToSeconds(time)
  console.log('Time in seconds', timeInSeconds)

  if (distance.unit === 'Mi') {

  } else {
    const averageSecondsPerMile = timeInSeconds * distance
    console.log('Average seconds per mile', averageSecondsPerMile)
  }
}

export const timeToSeconds = (time) => {
  return Moment.duration(time).asSeconds()
}
