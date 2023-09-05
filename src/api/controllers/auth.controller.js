const bcrypt = require("bcrypt");
const jwt = require("../libs/jwt");
const { generateHash, compareHash } = require("../libs/bcrypt");
const config = require("../../../config");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const adminpass = "admin";
    console.log(adminpass);
    if (email !== "admin1234@gmail.com") {
      res.render("signin");
    } else {
      if (password === "admin") {
        const token = jwt.sign({ id: "admin" });
        res.cookie("token", token);
        res.redirect("/admin");

      } else {
        res.render("signin");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loginGet = async (req, res, next) => {
  res.render("signin");
};
const adminPage = async (req, res) => {
    res.render("index");
  };

const admin = async (req, res, next) => {};

module.exports = {
  login,
  loginGet,
  admin,
  adminPage,
};
