const User = require('../models/user');
const bcrypt = require("bcrypt");


const getUserById = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.getById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateUser = async (req, res) => {
    const userId = req.userId;
    const { username, password, email, role } = req.body;
    try {
        const updateData = { username, email, role, id: userId };
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const updatedUser = await User.update(updateData);
        if (updatedUser) {  
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.delete({ id });
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserById,
    updateUser,
    deleteUser
};