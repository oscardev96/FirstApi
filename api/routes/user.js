const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config");
const avatar = "link image";
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let check = await User.findOne({ email });
    if (check) {
      return res.status(500).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      name,
      password: hashpassword,
      avatar,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "5 days",
    });
    return res.status(200).json({
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});
// DELETE USER
router.delete("/:userId", async (req, res) => {
  const id = req.body.userId;
  try {
    await User.remove({ _id: id });
    return res.status(200).json({ message: "succes" });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});
module.exports = router;
