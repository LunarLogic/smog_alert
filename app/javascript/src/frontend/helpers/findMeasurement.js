export const findMeasurement = (cityData, indicator) => {
  let values =
    cityData && cityData.last_hour_measurement
      ? cityData.last_hour_measurement.values
      : null;
  if (values) {
    const indicatorValue= values.find(value => value.name === indicator);
    return indicatorValue.value !== null ? indicatorValue : { value: "--" };
  }
  return { value: "--" };
};