import styles from "./Registration.module.scss";
import { useLocation } from "react-router-dom";

function Registration({ Outlet }: { Outlet?: React.ReactNode }) {
    const location = useLocation();
    return (
        <div className={styles.registrationContainer}>
            <div className={`position-absolute ${styles.back}`} onClick={() => window.history.back()}>
                BACK
            </div>
            <div className={styles.registrationCard}>
                <div className={styles.title}>{location.pathname === "/auth/register" ? "Create Account" : "Login"}</div>
                {Outlet}
            </div>
        </div>
    );
}

export default Registration;
