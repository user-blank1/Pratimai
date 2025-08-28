import News from "../Models/newsModel.js";
import User from "../Models/userModel.js";
export function news_get(req, res) {
    News.find()
        .then((articles) => {
            res.status(200).json(articles);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error fetching news articles", error });
        });
}

export async function news_post(req, res) {
    const { title, subtitle, text, link1, image, author, userId } = req.body;

    const newArticle = new News({
        title,
        subtitle,
        text,
        link1,
        image,
        author,
        userId,
    });
    try {
        await newArticle.save();
        await User.findByIdAndUpdate(userId, { $push: { myArticles: newArticle._id } });
        res.status(201).json({ message: "News article created", article: newArticle });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

export async function news_delete(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const deletedArticle = await News.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article deleted successfully", article: deletedArticle });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Error deleting article", error });
    }
}

export const news_put = async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, text } = req.body;

    try {
        const updatedArticle = await News.findByIdAndUpdate(id, { title, subtitle, text }, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ message: "Error updating article", error });
    }
};
