export const findMeasurement = (cityData, indicator) => {
  let values =
    cityData && cityData.last_hour_measurement
      ? cityData.last_hour_measurement.values
      : null;
  return values
    ? values.find(value => value.name === indicator)
    : { value: "--" };
};
