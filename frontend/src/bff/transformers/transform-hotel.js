export const transformHotel = (dbHotel) => ({
  id: dbHotel.id,
  name: dbHotel.name,
  address: dbHotel.address,
  imageUrl: dbHotel.image_url,
});
