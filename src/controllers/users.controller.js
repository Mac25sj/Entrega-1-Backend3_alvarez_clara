import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    const result = await usersService.update(userId, updateBody);
    res.status(200).json({ status: "success", message: "User updated", payload: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    const result = await usersService.delete(user);
    res.status(200).json({ status: "success", message: "User deleted", payload: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};