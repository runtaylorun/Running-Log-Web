export const convertMilesToKilometers = (kilometers) => {
  return kilometers * 0.621371
}

export const convertKilometersToMiles = (miles) => {
  return miles * 1.60934
}

export const addKilometersToMiles = (miles, kilometers) => {
  return Math.round(((miles + convertKilometersToMiles(kilometers)) + Number.EPSILON) * 100) / 100
}

export const addMilesToKilometers = (miles, kilometers) => {
  return Math.round(((kilometers + convertMilesToKilometers(miles)) + Number.EPSILON) * 100) / 100
}

export const distanceUnits = {
  Metric: 'Mi',
  Imperial: 'Km'
}
