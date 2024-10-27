const Hotel = require('../models/Hotel');

// find available hotels
async function findAvailableHotels(startDate, endDate) {
  // Находим все бронирования, пересекающиеся с заданным периодом
  const bookedRooms = await Booking.find({
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      { startDate: { $gte: startDate, $lte: endDate } },
      { endDate: { $gte: startDate, $lte: endDate } },
    ],
  }).distinct('roomId');

  // Получаем все номера, кроме забронированных в указанный период
  const availableRooms = await Room.find({ _id: { $nin: bookedRooms } });

  // Находим отели, к которым относятся доступные номера
  const availableHotelIds = availableRooms.map((room) => room.hotelId);
  const availableHotels = await Hotel.find({ _id: { $in: availableHotelIds } });

  return availableHotels;
}

// // add
// async function addPost(post) {
//   const newPost = await Post.create(post);

//   await newPost.populate({ path: 'comments', populate: 'author' });

//   return newPost;
// }

// // edit
// async function editPost(id, post) {
//   const newPost = await Post.findByIdAndUpdate(id, post, {
//     returnDocument: 'after',
//   });

//   await newPost.populate({ path: 'comments', populate: 'author' });

//   return newPost;
// }

// // delete
// function deletePost(id) {
//   return Post.deleteOne({ _id: id });
// }

// // get list with search and paginate
// async function getPosts(search = '', limit = 10, page = 1) {
//   const [posts, count] = await Promise.all([
//     Post.find({ title: { $regex: search, $options: 'i' } })
//       .limit(limit)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 }),
//     Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
//   ]);

//   return { posts, lastPage: Math.ceil(count / limit) };
// }

// // get item
// function getPost(id) {
//   return Post.findById(id).populate({
//     path: 'comments',
//     populate: 'author',
//   });
// }

module.exports = {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
};
