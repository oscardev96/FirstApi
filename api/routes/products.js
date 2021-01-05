const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: " Handling GET requests to /product",
  });
});
router.post("/", (req, res, next) => {
  res.status(200).json({
    message: " Handling Post requests to /product",
  });
});
router.put("/:productId", (req, res, next) => {
  res.status(200).json({
    message: " Handling Update requests to /product",
    id: req.params.productId,
  });
});
router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: " Handling Delete requests to /product",
  });
});
module.exports = router;
