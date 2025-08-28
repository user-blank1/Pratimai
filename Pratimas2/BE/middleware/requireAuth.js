import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default requireAuth;
