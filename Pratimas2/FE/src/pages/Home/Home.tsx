import NewsCard from "../../Components/newsCard";
import { useState, useEffect } from "react";
import styles from "./Home.module.scss";
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

function Home() {
    const [newsArticles, setNewsArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch("/api/news");
            const data = await response.json();
            setNewsArticles(data);
        };
        fetchNews();
    }, []);

    return (
        <div>
            <h1 className="text-center my-4">Popular news</h1>
            <div className={`${styles.newsArea} container`}>
                {newsArticles.map((article) => (
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

export default Home;
