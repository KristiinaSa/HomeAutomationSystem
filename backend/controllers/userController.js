import User from "../models/userModel.js";

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.destroy({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
};

