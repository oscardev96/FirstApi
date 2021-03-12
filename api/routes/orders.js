const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const checkAuth = require("../middleware/checkAuth");
router.get("/", checkAuth, async (req, res, next) => {
  try {
    let listOrder = await Order.find();
    res.status(200).json(listOrder);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.post("/", (req, res, next) => {
  try {
    let order = new Order({
      _id: mongoose.Types.ObjectId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
    order
      .save()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(200).json({
      error: error,
    });
  }
});
router.get("/:oderId", async (req, res, next) => {
  let id = req.params.orderId;
  try {
    let orderSelected = await Order.findById(id);
    res.status(200).json(orderSelected);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.delete("/:orderId", async (req, res, next) => {
  let id = req.params.orderId;
  try {
    await Order.remove({ _id: id });
    res.status(200).json({
      message: " Delete Done",
    });
  } catch (error) {
    res.status(200).json({
      error: error,
    });
  }
});
module.exports = router;
