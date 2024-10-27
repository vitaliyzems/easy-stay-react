const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;

const RoomSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Image should be a valid url',
    },
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
});

const Room = model('Room', RoomSchema);

module.exports = Room;
