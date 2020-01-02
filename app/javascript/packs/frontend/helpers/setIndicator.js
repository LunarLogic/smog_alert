export const setIndicator = status => {
  let indicator;
  switch (status) {
    case "bardzo dobry":
      indicator = 1;
      break;
    case "dobry":
      indicator = 2;
      break;
    case "umiarkowany":
      indicator = 3;
      break;
    case "dostateczny":
      indicator = 4;
      break;
    case "zły":
      indicator = 5;
      break;
    case "bardzo zły":
      indicator = 6;
      break;
  }
  return indicator;
};
