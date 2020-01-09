export const setPercent = (indicator, value) => {
  switch (indicator) {
    case "PM 10":
      return Math.round((value * 100) / 50);
    case "PM 2.5":
      return Math.round((value * 100) / 25);
  }
};
