import { Router } from "express";
const router = Router();
import { register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { myArticles } from "../controllers/userController.js";
import requireAuth from "../middleware/requireAuth.js";
router.post("/register", register);
router.post("/login", login);
router.get("/my-articles/:userId", requireAuth, myArticles);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});
export default router;
