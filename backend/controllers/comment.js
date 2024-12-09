const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function addComment(content, hotelId, userId) {
  try {
    const newComment = await Comment.create({
      content,
      hotel: hotelId,
      user: userId,
    });

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { comments: newComment._id },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { comments: newComment._id },
    });

    const populatedComment = await Comment.findById(newComment._id)
      .populate({ path: 'user', select: 'name' })
      .lean();

    return populatedComment;
  } catch (error) {
    console.error('Ошибка при создании комментария:', error);
    throw error;
  }
}

async function editComment(id, newContent) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content: newContent },
      { new: true }
    )
      .populate({
        path: 'user',
        select: 'name',
      })
      .lean();

    if (!updatedComment) {
      throw new Error('Комментарий не найден');
    }

    return updatedComment;
  } catch (error) {
    console.error('Ошибка при редактировании комментария:', error);
    throw error;
  }
}

async function removeComment(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid comment ID');
  }

  try {
    const result = await Comment.findByIdAndDelete(id);

    if (!result) {
      console.log('Comment not found');
      return { success: false, message: 'Comment not found' };
    }
    return { success: true, message: 'Comment successfully deleted' };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, message: 'Error deleting comment' };
  }
}

async function getRandomComments() {
  // const randomComments = await Comment.aggregate([{ $sample: { size: 3 } }]);

  const randomComments = await Comment.aggregate([
    { $sample: { size: 3 } }, // Выбираем 3 случайных комментария
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    { $project: { 'user.name': 1, content: 1, createdAt: 1 } },
  ]);

  return randomComments;
}

module.exports = {
  addComment,
  editComment,
  removeComment,
  getRandomComments,
};
