import authService from "../services/auth.js";

const register = async (req, res) => {
  try {
    await authService.registerUser(req);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Account created successfully, please check your inbox email to verify your account.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const accessToken = await authService.loginUser(email, password);
    res.status(200).json({
      ok: true,
      status: 200,
      accessToken,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await authService.forgotPasswordUser(email);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Please check your inbox email to reset your password.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    await authService.updatePasswordUser(id, password);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const activateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await authService.activateUser(id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Your account has been activated successfully.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const sendLinkToActivate = async (req, res) => {
  const { id } = req.params;

  try {
    await authService.sendLinkToActivateUser(id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "We sent a link to activate your account to your email, link expires in 20 minutes.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

export default {
  register,
  login,
  forgotPassword,
  updatePassword,
  activateUser,
  sendLinkToActivate,
};
