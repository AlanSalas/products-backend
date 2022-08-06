import jwt from "../utils/jwt.js";

const verifyToken = async (req, res, next) => {
  const authorization = req.get("authorization");
  const splitAuthhorization = authorization && authorization.split(" ");
  const token = splitAuthhorization && splitAuthhorization[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      status: 401,
      message: "Token is required.",
    });
  }

  try {
    const decodeToken = jwt.decodeToken(token);
    if (!decodeToken) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Error processing token.",
      });
    }
    req.user = decodeToken;
    next();
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

export default {
  verifyToken,
};
