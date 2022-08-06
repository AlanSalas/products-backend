import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = async (user, expiresIn) => {
  const payload = {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    status: user.status,
  };

  try {
    if (!SECRET_KEY) {
      throw {
        ok: false,
        status: 500,
        message: "Error generating token, Secret key is required.",
      };
    }

    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  } catch (error) {
    throw {
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw error;
  }
};

export default {
  createToken,
  decodeToken,
};
