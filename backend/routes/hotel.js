const express = require('express');
const {
  findAvailableHotels,
  getHotelWithAvailableRooms,
  getRandomHotels,
} = require('../controllers/hotel');
const mapHotel = require('../helpers/mapHotel');
const mapHotelWithRooms = require('../helpers/mapHotelWithRooms');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const availableHotels = await findAvailableHotels(
    req.query.startDate,
    req.query.endDate
  );

  res.send({ data: availableHotels.map(mapHotel) });
});

router.get('/random', async (req, res) => {
  const hotels = await getRandomHotels();

  res.send({ data: hotels.map(mapHotel) });
});

router.get('/:id', async (req, res) => {
  const hotel = await getHotelWithAvailableRooms(
    req.params.id,
    req.query.startDate,
    req.query.endDate
  );

  res.send({ data: mapHotelWithRooms(hotel) });
});

module.exports = router;
