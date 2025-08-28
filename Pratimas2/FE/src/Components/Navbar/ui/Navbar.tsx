import styles from "./Navbar.module.scss";
// @ts-expect-error: wdhbwuoadyibkwuadhgv
import { useAuthContext } from "../../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
    const { user, dispatch } = useAuthContext();

    const handleLogout = () => {
        localStorage.setItem("justLoggedOut", "true");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };
    return (
        <div className={`${styles["navbar-container"]}`}>
            <nav className="navbar navbar-expand-lg bg-primary bg-opacity-75">
                <div className="container">
                    <Link className="nav-link fs-1" to="/">
                        Home
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-4" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                {user ? (
                                    <p className="nav-link fs-4">{user.user.username}</p>
                                ) : (
                                    <Link className="nav-link fs-4" to="/auth/register">
                                        Register
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {!user && (
                                    <Link className="nav-link fs-4" to="/auth/login">
                                        Login
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {user && (
                                    <Link className="nav-link fs-4" to="/create-news">
                                        Post Article
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {user && (
                                    <Link className="nav-link fs-4" to="/my-articles">
                                        My Articles
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {user && (
                                    <button className="nav-link fs-4" onClick={handleLogout}>
                                        Logout
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
