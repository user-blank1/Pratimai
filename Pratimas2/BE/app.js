import express from "express";
import mongoose from "mongoose";
import router from "./routes/newsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
const dbUri = "mongodb+srv://linaszilinskasas:NBtDLG5YPDwK5qno@cluster0.wr2dwej.mongodb.net/Pratimas2";

app.use(express.json());
app.use("/api", router);
app.use("/api/user", userRouter);

mongoose
    .connect(dbUri)
    .then(() => {
        app.listen(3000, () => {
            console.log("http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
