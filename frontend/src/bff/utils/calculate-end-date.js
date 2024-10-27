export const calculateEndDate = (startDate, daysToAdd) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + daysToAdd);
  return date;
};
