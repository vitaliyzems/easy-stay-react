const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;

const HotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
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
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
});

const Hotel = model('Hotel', HotelSchema);

module.exports = Hotel;
