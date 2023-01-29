const express = require("express");
const router = express.Router();

// controllers
const {
  create,
  listProduct,
  removeProduct,
  readProduct,
  updateProduct,
} = require("../controllers/product");

// middleware
const { auth, adminCheck } = require("../middleware/auth");
const { upload } = require("../middleware/uploadfile");

//@Endpoint     http://localhost:5000/api/product
router.post("/product", auth, adminCheck, upload, create);
router.get("/product", listProduct);
router.get("/product/:id", readProduct);
router.put("/product/:id", auth, adminCheck, upload, updateProduct);
router.delete("/product/:id", auth, adminCheck, removeProduct);

module.exports = router;
