const PostMessage = require('../models/postMessage');
const mongoose = require('mongoose');

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
    // console.log(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  const body = req.body;
  try {
    const newPost = new PostMessage(body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }
  //new to true so that we actually receive the updated data
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...body, id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Post deleted successfully' });
};

const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }
  //new to true so that we actually receive the updated data
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );
  // console.log(post);
  console.log(updatedPost);
  res.json(updatedPost);
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
