export const yesterdayDateFormatted = () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();

  return (date = yyyy + "-" + mm + "-" + dd);
};
