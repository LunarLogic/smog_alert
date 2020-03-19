const SETTINGS = {
  "PM 10": "50",
  "PM 2.5": "25"
};

export const setLimit = name => {
  return SETTINGS[name] || "--";
};
