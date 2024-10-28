module.exports = function (hotel) {
  return {
    id: hotel._id,
    name: hotel.name,
    address: hotel.address,
    imageUrl: hotel.image_url,
  };
};
