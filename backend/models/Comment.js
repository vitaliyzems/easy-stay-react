const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
