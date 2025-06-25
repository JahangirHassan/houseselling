const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
    let users = await User.find();
    res.json(users);
};

module.exports.updateUser = async (req, res) => {
    let { id } = req.params;
    let { role } = req.body;
    await User.findByIdAndUpdate(id, { role });
    res.status(200).json({ message: "User role updated successfully" });
};

module.exports.delUser = async (req, res) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
};