const mapComment = require('./mapComment');
const mapRoom = require('./mapRoom');

module.exports = function (hotel) {
  return {
    id: hotel._id,
    name: hotel.name,
    address: hotel.address,
    imageUrl: hotel.image_url,
    rooms: hotel.rooms.map(mapRoom),
    comments: hotel.comments.map(mapComment),
  };
};
