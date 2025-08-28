import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    link1: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const News = mongoose.model("News", newsSchema);

export default News;
