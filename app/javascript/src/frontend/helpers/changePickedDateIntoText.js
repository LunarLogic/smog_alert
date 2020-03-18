export const changePickedDateIntoText = date => {
  const formatter = new Intl.DateTimeFormat("pl", { month: "long" });
  const pickedMonth = formatter.format(date);
  return `${pickedMonth} ${date.getFullYear()}`;
};
