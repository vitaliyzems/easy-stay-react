module.exports = function (room) {
  return {
    id: room._id,
    type: room.type,
    price: room.price,
    imageUrl: room.image_url,
  };
};
