const limits = { PM10: 50, PM25: 25 };

export const setPercent = (indicator, value) => {
  switch (indicator) {
    case "PM 10":
      return Math.round((Number(value) * 100) / limits.PM10).toString();
    case "PM 2.5":
      return Math.round((Number(value) * 100) / limits.PM25).toString();
    default:
      return "--";
  }
};
