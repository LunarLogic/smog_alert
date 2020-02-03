export const classNameForPollutionStatus = status => {
  let cssClassName;
  switch (status) {
    case "bardzo dobry":
      cssClassName = "very-good";
      break;
    case "dobry":
      cssClassName = "good";
      break;
    case "umiarkowany":
      cssClassName = "moderate";
      break;
    case "dostateczny":
      cssClassName = "sufficient";
      break;
    case "zły":
      cssClassName = "bad";
      break;
    case "bardzo zły":
      cssClassName = "very-bad";
      break;
    case "zbyt mało danych":
      cssClassName = "no-sufficient-data";
      break;
    default:
      "no-sufficient-data";
  }
  return cssClassName;
};
