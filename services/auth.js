import userService from "./user.js";
import jwt from "../utils/jwt.js";
import nodemailer from "../utils/nodemailer.js";
import bcrypt from "bcrypt";
import { emailConfigActivateAccount, emailConfigUpdatePassword } from "../config/emailsConfig.js";

const registerUser = async (req) => {
  try {
    const user = await userService.create(req.body);
    const token = await jwt.createToken(user, "20min");
    const url = token && `${process.env.URL_CLIENT}activation/${token}`;
    const emailConfig = emailConfigActivateAccount(user, url);
    await nodemailer.prepareAndSendEmail(emailConfig);
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const accessToken = await userService.generateAccessToken(email, password);
    return accessToken;
  } catch (error) {
    throw error;
  }
};

const forgotPasswordUser = async (email) => {
  try {
    const emailIsRegistered = await userService.findItem({ email });
    if (!emailIsRegistered) {
      throw {
        ok: false,
        status: 400,
        message: `The email ${email}, is not registered. Please try again with an email regisered.`,
      };
    }
    const token = await jwt.createToken(emailIsRegistered, "20m");
    const url = `${process.env.URL_CLIENT}reset-password/${token}`;
    const emailConfig = emailConfigUpdatePassword(emailIsRegistered, url);
    await nodemailer.prepareAndSendEmail(emailConfig);
  } catch (error) {
    throw error;
  }
};

const updatePasswordUser = async (user, password) => {
  try {
    const encryptPassword = bcrypt.hashSync(password, 10);
    await userService.update(user.id, { password: encryptPassword });
  } catch (error) {
    throw error;
  }
};

const activateUser = async (id) => {
  try {
    const userActivated = await userService.update(id, { status: true });
    if (userActivated.status) {
      throw {
        ok: false,
        status: 400,
        message: "This account has been activated, you can login.",
      };
    }
    return userActivated;
  } catch (error) {
    throw error;
  }
};

const sendLinkToActivateUser = async (id) => {
  try {
    const user = await userService.findById(id);
    if (user && user.status) {
      throw {
        ok: false,
        status: 400,
        message: "This account has been activated, you can login.",
      };
    }
    const token = await jwt.createToken(user, "20min");
    const url = token && `${process.env.URL_CLIENT}activation/${token}`;
    const emailConfig = emailConfigActivateAccount(user, url);
    await nodemailer.prepareAndSendEmail(emailConfig);
  } catch (error) {
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  forgotPasswordUser,
  updatePasswordUser,
  activateUser,
  sendLinkToActivateUser,
};
