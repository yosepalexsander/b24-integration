const { User } = require("../../models");
const joi = require("joi");
const hashing = require("../utils/hashing");
const { generateAccessToken } = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const schema = joi.object({
      name: joi.string().min(5).required(),
      email: joi.string().email().min(8).required(),
      password: joi.string().min(8).required(),
      gender: joi.string().valid("male", "female").required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const emailExist = await User.findOne({
      where: {
        email,
      },
    });

    if (emailExist) {
      return res.send({
        status: "Failed",
        message: "Email Already Registered",
      });
    }
    const hashedPassword = await hashing.hashPassword(password);

    const dataUser = await User.create({
      id: uuidv4(),
      ...req.body,
      password: hashedPassword,
    });

    const token = generateAccessToken(
      {
        id: dataUser.id,
      },
      process.env.TOKEN_SECRET
    );
    res.send({
      status: "succes",
      data: {
        name: dataUser.name,
        email: dataUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(8).required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const dataUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!dataUser) {
      return res.send({
        status: "Failed",
        message: "Email and Password don't match",
      });
    }

    const isValidPassword = await hashing.comparePassword(
      password,
      dataUser.password
    );

    if (!isValidPassword) {
      return res.status(400).send({
        status: "Failed",
        message: "Your credentials is invalid",
      });
    }
    const token = generateAccessToken(
      {
        id: dataUser.id,
      },
      process.env.TOKEN_SECRET
    );

    res.send({
      status: "success",
      data: {
        name: dataUser.name,
        email: dataUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.userId;

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        name: dataUser.name,
        email: dataUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
