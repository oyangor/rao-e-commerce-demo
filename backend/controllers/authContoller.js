const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authContoller = require("express").Router();

const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });

  return token;
};

authContoller.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(500).json({ message: "User have already registered" });
    }
    if (
      req.body.username === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return res.status(500).json({ message: "All fields must be filled" });
    }
    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hashedpassword });
    await user.save();

    const { password, ...others } = user._doc;
    const token = createToken(user);

    return res.status(201).json({ others, token });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

authContoller.post("/login", async (req, res) => {
  const { email, password: userPass } = req.body;
  try {
    if (email === "" || userPass === "") {
      return res.status(500).json({ message: "All fields must be added" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid Credentials" });
    }

    const comparePassword = await bcrypt.compare(userPass, user.password);
    if (!comparePassword) {
      return res.status(500).json({ message: "Invalid Credentials" });
    }

    const { password, ...others } = user._doc;
    const token = createToken(user);

    return res.status(200).json({ others, token });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

module.exports = authContoller;
