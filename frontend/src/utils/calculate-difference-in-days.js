export const calculateDifferenceInDays = (fromString, toString) => {
  const dateFrom = new Date(fromString);
  const dateTo = new Date(toString);

  return (dateTo - dateFrom) / 86400000;
};
