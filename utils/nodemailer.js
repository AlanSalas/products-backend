import nodemailer from "nodemailer";
const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
});

const prepareAndSendEmail = async (mailConfig) => {
  try {
    if (!EMAIL || !EMAIL_PASS) {
      throw {
        ok: false,
        status: 500,
        message: "Error sending email, try again later.",
      };
    }
    await transporter.sendMail(mailConfig);
    console.log(mailConfig);
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

export default {
  prepareAndSendEmail,
};
