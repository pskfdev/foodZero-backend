const Blog = require("../models/Blog");
const fs = require("fs");

exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newData = {
      title: title,
      description: description,
      image: req.file.filename,
    };
    const blog = await new Blog(newData).save();
    res.send(blog);
  } catch (err) {
    res.status(500).send("Create blog error!!");
  }
};

exports.listBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.send(blog);
  } catch (err) {
    res.status(500).send("List blog error!!");
  }
};

exports.removeBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findOneAndDelete({ _id: id });
    await fs.unlink(`./public/uploads/${blog.image}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Remove Image(Server) Success!");
      }
    });
    res.send(blog);
  } catch (err) {
    res.status(500).send("Delete blog error!!");
  }
};
