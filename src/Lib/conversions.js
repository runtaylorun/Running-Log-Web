export const convertMilesToKilometers = (miles) => {
  return miles * 1.60934
}

export const convertKilometersToMiles = (kilometers) => {
  return kilometers * 0.621371
}

export const convertMetersToMiles = (meters) => {
  return meters * 0.000621371
}

export const convertMetersToKilometers = (meters) => {
  return meters * 0.001
}

export const addKilometersToMiles = (miles, kilometers) => {
  return Math.round(((miles + convertKilometersToMiles(kilometers)) + Number.EPSILON) * 100) / 100
}

export const addMilesToKilometers = (miles, kilometers) => {
  return Math.round(((kilometers + convertMilesToKilometers(miles)) + Number.EPSILON) * 100) / 100
}

export const convertToUserMeasurementSystem = (distanceUnit, distance, measurementSystem) => {
  if (distanceUnit === 'Km' && measurementSystem === 'Metric') {
    return convertKilometersToMiles(distance)
  }

  if (distanceUnit === 'Mi' && measurementSystem === 'Imperial') {
    return convertMilesToKilometers(distance)
  }

  if (distanceUnit === 'M' && measurementSystem === 'Metric') {
    return convertMetersToMiles(distance)
  }

  if (distanceUnit === 'M' && measurementSystem === 'Imperial') {
    return convertMetersToKilometers(distance)
  }

  return distance
}

export const roundTo2 = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

export const distanceUnits = {
  Metric: 'Mi',
  Imperial: 'Km'
}
