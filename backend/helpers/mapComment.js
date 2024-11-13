module.exports = function (comment) {
  return {
    id: comment._id,
    content: comment.content,
    author: comment.user.name,
    authorId: comment.user._id,
    createdAt: comment.createdAt,
  };
};
