import { useState } from "react";
import styles from "./ArticleForm.module.scss";
// @ts-expect-error: wdhbwuoadyibkwuadhgv
import { useAuthContext } from "../../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";
function ArticleForm() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [img, setImg] = useState("");
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [text, setText] = useState("");
    const [link1, setLink1] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errorDiv = document.getElementById("error");
        if (errorDiv) {
            errorDiv.textContent = "";
        }

        const articleData = { image: img, title, subtitle, text, link1, author: user.user.username, userId: user.user.id };
        const res = await fetch("/api/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify(articleData),
        });
        const data = await res.json();
        if (res.ok) {
            setImg("");
            setTitle("");
            setSubtitle("");
            setText("");
            setLink1("");
            alert("Article submitted successfully!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            console.error("Error submitting article:", data);
            const errorDiv = document.getElementById("error");
            if (errorDiv) {
                errorDiv.textContent = data.error || "Unknown error";
            }
        }
    };

    return (
        <div className={styles["article-form"]}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Submit an Article</h2>
                <div id="error"></div>
                <label>
                    Image URL
                    <input type="text" value={img} onChange={(e) => setImg(e.target.value)} className={styles.input} placeholder="Enter image URL" />
                </label>
                <label>
                    Title
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} placeholder="Enter title" required />
                </label>
                <label>
                    Subtitle
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className={styles.input}
                        placeholder="Enter subtitle"
                        required
                    />
                </label>
                <label>
                    Text
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className={styles.textarea} placeholder="Enter article text" required />
                </label>
                <label>
                    Link
                    <input type="text" value={link1} onChange={(e) => setLink1(e.target.value)} className={styles.input} placeholder="Enter link" required />
                </label>
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ArticleForm;
