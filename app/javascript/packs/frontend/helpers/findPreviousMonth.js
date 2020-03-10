export const findPreviousMonth = date =>
  date.getDate() > 15 ? date : new Date(date.setMonth(date.getMonth() - 1));
