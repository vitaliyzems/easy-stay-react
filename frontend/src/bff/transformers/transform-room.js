export const transformRoom = (dbRoom) => ({
  id: dbRoom.id,
  hotelId: dbRoom.hotel_id,
  type: dbRoom.type,
  price: dbRoom.price,
  imageUrl: dbRoom.image_url,
  bookings: dbRoom.bookings,
});
