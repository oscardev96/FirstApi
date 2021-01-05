const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: " Handling GET requests to /order",
  });
});
router.post("/", (req, res, next) => {
  res.status(200).json({
    message: " Handling Post requests to /order",
  });
});
router.get("/:oderId", (req, res, next) => {
  res.status(200).json({
    message: " Handling detail requests to /order",
  });
});
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: " Handling Delete requests to /order",
  });
});
module.exports = router;
