const getRandomHotels = (hotels, count) => {
  return hotels.sort(() => 0.5 - Math.random()).slice(0, count);
};

module.exports = { getRandomHotels };
