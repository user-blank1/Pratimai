import styles from "./NewsCard.module.scss";
import img from "../../../imgs/image.png";
// @ts-expect-error: wdhbwuoadyibkwuadhgv
import { useAuthContext } from "../../../hooks/useAuthContext.js";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
function NewsCard({
    id,
    title,
    subtitle,
    text,
    link1,
    image,
    author,
    authorId,
}: {
    id: string | number;
    title?: string;
    subtitle?: string;
    text?: string;
    link1?: string;
    image?: string;
    author?: string;
    authorId?: string;
}) {
    const { user } = useAuthContext();
    const userId = user?.user?.id;
    const location = useLocation();
    const [showEdit, setShowEdit] = useState(false);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    const editFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showEdit) return;
        const handleClick = (e: MouseEvent) => {
            if (editButtonRef.current?.contains(e.target as Node) || editFormRef.current?.contains(e.target as Node)) {
                return;
            }
            setShowEdit(false);
        };
        window.addEventListener("mousedown", handleClick);
        return () => {
            window.removeEventListener("mousedown", handleClick);
        };
    }, [showEdit]);

    const handleDelete = async () => {
        if (!id) return;
        try {
            const res = await fetch(`/api/news/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user?.token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                console.error("Error deleting article:", data);
                alert(data.message);
                return;
            } else {
                alert("Article deleted successfully!");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error deleting article:", err);
        }
    };
    const handleEdit = () => {
        setShowEdit(!showEdit);
    };

    const sendEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const title = formData.get("title");
        const subtitle = formData.get("subtitle");
        const text = formData.get("text");
        const res = await fetch(`/api/news/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({ title, subtitle, text }),
        });
        const data = await res.json();
        if (!res.ok) {
            console.error("Error updating article:", data);
            alert(data.message);
            return;
        } else {
            alert("Article updated successfully!");
            window.location.reload();
        }
    };
    return (
        <div className={`card ${styles.card} border shadow-lg position-relative`}>
            <div className={showEdit ? styles.showEdit : ""}>
                <div className={styles.container}>
                    <img src={image || img} className={`img-fluid ${styles.img}`} alt="..."></img>
                </div>
                <div className={showEdit ? `${styles.showEdit} card-body` : "card-body"}>
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                    <p className="card-text">{text}</p>
                    <a href={link1} className="card-link">
                        {link1}
                    </a>
                    <p className="card-text">
                        <small className="text-muted">By {author}</small>
                    </p>
                    {userId && userId === authorId && (
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Delete
                        </button>
                    )}
                    {location.pathname === "/my-articles" && (
                        <button className="btn btn-danger mx-3" onClick={handleEdit} ref={editButtonRef}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
            {showEdit && (
                <div className={`edit-form position-absolute ${styles.edit}`} ref={editFormRef}>
                    <h5 className="text-white bg-dark p-1">Edit Article</h5>
                    <form onSubmit={(e) => sendEdit(e)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                <p className="text-white bg-dark p-1 m-0">Title</p>
                            </label>
                            <input type="text" className="form-control" id="title" name="title" defaultValue={title} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subtitle" className="form-label">
                                <p className="text-white bg-dark p-1 m-0">Subtitle</p>
                            </label>
                            <input type="text" className="form-control" id="subtitle" name="subtitle" defaultValue={subtitle} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">
                                <p className="text-white bg-dark p-1 m-0">Text</p>
                            </label>
                            <textarea className="form-control" id="text" name="text" rows={3} defaultValue={text}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NewsCard;
