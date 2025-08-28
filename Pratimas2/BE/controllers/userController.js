import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, "secret", { expiresIn: "1d" });
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({ user: { id: user._id, username, email }, token });
    } catch (error) {
        const message = error.message;
        res.status(500).json({ message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ user: { id: user._id, username: user.username, email }, token });
    } catch (error) {
        const message = error.message;
        res.status(400).json({ message });
    }
};

export const myArticles = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate("myArticles");
        res.status(200).json(user.myArticles);
    } catch (error) {
        const message = error.message;
        res.status(500).json({ message });
    }
};
