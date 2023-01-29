const Product = require("../models/Product");
const fs = require("fs");

exports.create = async (req, res) => {
  try {
    /* console.log(req.body);
    console.log(req.file); */
    const { title, description, category, price } = req.body;
    const newData = {
      title: title,
      description: description,
      category: category,
      price: price,
      image: req.file.filename,
    };
    const product = await new Product(newData).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create product error!!");
  }
};

exports.listProduct = async (req, res) => {
  try {
    const product = await Product.find().populate("category");
    res.send(product);
  } catch (err) {
    res.status(500).send("List product error!!");
  }
};

exports.readProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
    }).populate("category").exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Read product error!!");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, category, price, imageOld } = req.body;
    const newData = {
      title: title,
      description: description,
      category: category,
      price: price,
      image: imageOld, //filename: มาจาก middleware upload
    };
    //check upload image
    if (typeof req.file !== "undefined") {
      newData.image = req.file.filename;

      await fs.unlink(`./public/uploads/${imageOld}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Update Image(Server) Success!");
        }
      });
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      newData,
      { new: true }
    );
    res.send(product);
  } catch (err) {
    res.status(500).send("Update product error!!");
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ _id: id });
    await fs.unlink(`./public/uploads/${product.image}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Remove Image(Server) Success!");
      }
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Remove product Error!");
  }
};
