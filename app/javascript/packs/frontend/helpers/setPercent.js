const limits = { PM10: 50, PM25: 25 };

export const setPercent = (indicator, value) => {
  switch (indicator) {
    case "PM 10":
      return Math.round((value * 100) / limits.PM10);
    case "PM 2.5":
      return Math.round((value * 100) / limits.PM25);
  }
};
