const months = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia"
];

const addZeros = integer => {
  return integer.toString().length < 2
    ? integer.toString().padStart(2, "0")
    : integer;
};

export const getDate = date => {
  if (date) {
    const parsedDate = new Date(Date.parse(date));

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth();
    const year = parsedDate.getFullYear();

    const hour = addZeros(parsedDate.getHours());
    const minutes = addZeros(parsedDate.getMinutes());

    const fullDate = `${day} ${months[month]} ${year}r., ${hour}:${minutes}`;
    return fullDate;
  } else {
    return "--";
  }
};
