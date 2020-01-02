export const setColor = status => {
  let color;
  switch (status) {
    case "bardzo dobry":
      color = "#97cd2e";
      break;
    case "dobry":
      color = "#c3d735";
      break;
    case "umiarkowany":
      color = "#fbd42d";
      break;
    case "dostateczny":
      color = "#ff8f00";
      break;
    case "zły":
      color = "#cc571a";
      break;
    case "bardzo zły":
      color = "#7d0d0f";
      break;
  }
  return color;
};
