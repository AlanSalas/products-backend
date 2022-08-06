import User from "../models/User.js";
import jwt from "../utils/jwt.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs-extra";

// Create user
const create = async ({ name, lastName, username, email, password }) => {
  try {
    // Verify if exist email exist
    const emailIsRegistered = await User.findOne({ email });
    if (emailIsRegistered) {
      throw {
        ok: false,
        status: 400,
        message: `The email ${email} is already registered, try again with a different email.`,
      };
    }

    // Verify if exist username exist
    const usernameIsRegistered = await User.findOne({ username });
    if (usernameIsRegistered) {
      throw {
        ok: false,
        status: 400,
        message: `The username ${username} is already registered, try again with a different username.`,
      };
    }

    const newUser = new User({
      name,
      lastName,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const savedUser = await User.create(newUser);
    return savedUser;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Update user
const update = async (id, newData, image) => {
  try {
    if (!id) throw { ok: false, status: 400, message: "The id is required." };
    const user = await User.findById(id);
    const updatedImage = image && (await cloudinary.uploadImage(image?.path));
    newData.image = updatedImage && { publicId: updatedImage?.public_id, secureUrl: updatedImage?.secure_url };
    updatedImage && (await fs.unlink(image.path));
    user?.image?.publicId && (await cloudinary.removeImage(user?.image?.publicId));
    const updatedUser = await User.findByIdAndUpdate(id, newData);
    return updatedUser;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

const findById = async (id) => {
  try {
    if (!id) throw { ok: false, status: 400, message: "The id is required." };
    const user = await User.findById(id);
    if (!user) throw { ok: false, status: 400, message: `The id ${id} not exists.` };
    return user;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// find user by param
const findItem = async (obj) => {
  try {
    const item = await User.findOne(obj);
    return item;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// remove user
const remove = async (id) => {
  try {
    if (!id) throw { ok: false, status: 400, message: "The id is required." };
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// generate accessToken for login
const generateAccessToken = async (email, password) => {
  try {
    const emailIsRegistered = await User.findOne({ email });
    if (!emailIsRegistered) {
      throw {
        ok: false,
        status: 400,
        message: `The email ${email} is not registered.`,
      };
    }

    const passwordMatch = bcrypt.compareSync(password, emailIsRegistered.password);
    if (!passwordMatch) {
      throw {
        ok: false,
        status: 400,
        message: "Email or password invalid, try again.",
      };
    }

    if (!emailIsRegistered.status) {
      throw {
        ok: false,
        status: 400,
        message: "This account is not activated, please check your inbox email to activate it.",
      };
    }

    const accessToken = await jwt.createToken(emailIsRegistered, "30d");
    return accessToken;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

export default {
  create,
  update,
  findById,
  findItem,
  remove,
  generateAccessToken,
};
