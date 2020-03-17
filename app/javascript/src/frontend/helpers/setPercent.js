const limits = { PM10: 50, PM25: 25 };
const NO_DATA = '--'

export const setPercent = (indicator, value) => {
  switch (indicator) {
    case "PM 10":
      return value !== null ? Math.round((Number(value) * 100) / limits.PM10) : NO_DATA;
      break;
    case "PM 2.5":
      return value !== null ? Math.round((Number(value) * 100) / limits.PM25) : NO_DATA;
      break;
    default:
      return NO_DATA
  }
};
