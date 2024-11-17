const express = require('express');
const {
  addComment,
  removeComment,
  editComment,
  getRandomComments,
} = require('../controllers/comment');
const mapComment = require('../helpers/mapComment');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const newComment = await addComment(
    req.body.content,
    req.body.hotelId,
    req.body.userId
  );

  res.send({ data: mapComment(newComment) });
});

router.patch('/:id', async (req, res) => {
  const updatedComment = await editComment(req.params.id, req.body.content);

  res.send({ data: mapComment(updatedComment) });
});

router.delete('/:id', async (req, res) => {
  const response = await removeComment(req.params.id);

  res.send({ data: response });
});

router.get('/random', async (req, res) => {
  const randomComments = await getRandomComments();

  res.send({ data: randomComments.map(mapComment) });
});

module.exports = router;
