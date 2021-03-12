const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const checkAuth = require("../middleware/checkAuth");
const checkAdmin = require("../middleware/checkAdmin");
router.get("/", checkAuth, async (req, res, next) => {
  try {
    let products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: " not found",
    });
  }
  // Product.find()
  //   .exec()
  //   .then((result) => {
  //     res.status(200).json({
  //       result,
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       message: error,
  //     });
  //   });
});
router.get("/:productId", async (req, res, next) => {
  let productId = req.params.productId;
  try {
    let productSelected = await Product.findById(productId);
    res.status(200).json(productSelected);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: " nor found",
    });
  }
});
router.post("/", (req, res, next) => {
  let product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
  res.status(200).json({
    createdProduct: product,
  });
});
router.put("/:productId", async (req, res, next) => {
  let id = req.params.productId;
  try {
    let update = await Product.updateOne(
      { _id: id },
      {
        name: req.body.name,
        price: req.body.price,
      }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.delete("/:productId", async (req, res, next) => {
  let id = req.params.productId;
  try {
    await Product.remove({ _id: id });
    res.status(200).json({
      message: "Done",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
module.exports = router;
