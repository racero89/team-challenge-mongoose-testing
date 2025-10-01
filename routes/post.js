const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.post("/create", async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/id/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).json({ error: "No encontrado" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/title/:title", async (req, res) => {
  try {
    const posts = await Post.find({ title: new RegExp(req.params.title, "i") });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/id/:_id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) return res.status(404).json({ error: "No encontrado" });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/id/:_id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params._id);
    if (!deletedPost) return res.status(404).json({ error: "No encontrado" });
    res.json({ message: "Publicación eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
