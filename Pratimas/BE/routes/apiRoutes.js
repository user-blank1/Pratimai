import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

router.get("/all", controller.getAll);
router.get("/by_name/:name", controller.getByName);
router.get("/programuotojai", controller.prog_get);
router.post("/programuotojai", controller.prog_post);
router.put("/programuotojai/:id", controller.prog_put);
router.delete("/programuotojai/:id", controller.prog_delete);

export default router;
