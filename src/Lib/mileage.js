import { addKilometersToMiles, addMilesToKilometers } from './conversions'

export const getMileageTotal = (activities, measurementPreference) => {
  const kilometers = activities?.reduce((accumulator, activity) => {
    return activity.distanceUnit === 'Km' ? accumulator + activity.distance : accumulator
  }, 0)
  const miles = activities?.reduce((accumulator, activity) => {
    return activity.distanceUnit === 'Mi' ? accumulator + activity.distance : accumulator
  }, 0)

  const mileageTotal = measurementPreference === 'Metric' ? addKilometersToMiles(miles, kilometers) : addMilesToKilometers(miles, kilometers)

  return isNaN(mileageTotal) ? 0 : mileageTotal
}
