const User = require('../models/user');


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getById(id);
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
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    try {
        const updatedUser = await User.update({ id, username, email, password, role });
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