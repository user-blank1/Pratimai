import NewsCard from "../../Components/newsCard";
import { useState, useEffect } from "react";
// @ts-expect-error: wdhbwuoadyibkwuadhgv
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";
type Article = {
    _id: string | number;
    title: string;
    subtitle: string;
    text: string;
    link1?: string;
    author: string;
    image: string;
    userId: string;
};

function MyArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const { user, loading } = useAuthContext();
    const userId = user?.user?.id;
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate("/auth/login");
            return;
        }
        if (!user.user?.id || !user.token) return;
        const fetchArticles = async () => {
            const response = await fetch(`/api/user/my-articles/${userId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            console.log("Fetched articles:", data);
            setArticles(data);
        };
        fetchArticles();
    }, [user, userId, user?.token, loading, navigate]);
    return (
        <div>
            <h1 className="text-center my-4">My Articles</h1>
            <div className="container d-flex flex-row flex-wrap justify-content-center gap-4">
                {articles.map((article) => (
                    <NewsCard
                        key={article._id}
                        id={article._id}
                        title={article.title}
                        subtitle={article.subtitle}
                        text={article.text}
                        link1={article.link1}
                        image={article.image}
                        author={article.author}
                        authorId={article.userId}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyArticles;
