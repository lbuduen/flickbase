require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (_id) => {
  return await User.findById(_id);
};

const updateUserProfile = async (req) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
        },
      },
      {
        new: true,
      }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (req) => {
  try {
    if (await User.emailTaken()) {
      throw new Error("Email taken");
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        $set: {
          email: req.body.newEmail,
          verified: false,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {}
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.DB_SECRET);
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  validateToken,
};
