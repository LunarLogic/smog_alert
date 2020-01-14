export const setLimit = name => {
  switch (name) {
    case "PM 10":
      return "50";
    case "PM 2.5":
      return "25";
    default:
      return "--";
  }
};
