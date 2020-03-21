export const formatMonthlyDate = date => {
  return `01-${date.getMonth() + 1}-${date.getFullYear()}`;
};
