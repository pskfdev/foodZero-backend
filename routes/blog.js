const express = require("express");
const router = express.Router();

// controllers
const { createBlog, listBlog, removeBlog } = require("../controllers/blog");

// middleware
const { auth, adminCheck } = require("../middleware/auth");
const { upload } = require("../middleware/uploadfile");

//@Endpoint     http://localhost:5000/api/blog
router.post("/blog", auth, adminCheck, upload, createBlog);
router.get("/blog", listBlog);
router.delete("/blog/:id", auth, adminCheck, removeBlog);


module.exports = router;