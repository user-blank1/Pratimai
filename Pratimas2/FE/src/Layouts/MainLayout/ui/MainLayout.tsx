import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import styles from "./MainLayout.module.scss";
import Home from "../../../pages/Home/Home";
import Registration from "./Registration.tsx";
import RegForm from "../../../Components/RegForm/RegForm.tsx";
import LoginForm from "../../../Components/LoginForm/LoginForm.tsx";
import ArticleForm from "../../../Components/ArticleForm";
import MyArticles from "../../../pages/MyArticles/MyArticles.tsx";
function MainLayout() {
    return (
        <div className={styles.mainLayout}>
            <Navbar />
            <div className={styles.Outlet}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

function RegistrationLayout({ Outlet }: { Outlet?: React.ReactNode }) {
    return (
        <div className={`${styles.registrationLayout}`}>
            <Registration Outlet={Outlet} />
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "create-news", element: <ArticleForm /> },
            { path: "my-articles", element: <MyArticles /> },
        ],
    },
    {
        path: "/auth",
        element: <RegistrationLayout Outlet={<Outlet />} />,
        children: [
            { path: "register", element: <RegForm /> },
            { path: "login", element: <LoginForm /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
