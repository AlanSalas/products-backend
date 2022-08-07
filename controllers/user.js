import userService from "../services/user.js";
import _ from "underscore";

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.findById(id);
    res.status(200).json({
      ok: true,
      status: 200,
      user,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const image = req.file ? req.file : null;
  const updateUser = _.pick(req.body, ["name", "lastName"]);

  try {
    await userService.update(id, updateUser, image);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Profile has been updated successfully.",
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
  getUserById,
  updateUser,
};
