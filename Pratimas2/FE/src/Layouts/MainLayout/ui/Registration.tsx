import styles from "./Registration.module.scss";

function Registration({ Outlet }: { Outlet?: React.ReactNode }) {
    return (
        <div className={styles.registrationContainer}>
            <div className={`position-absolute ${styles.back}`} onClick={() => window.history.back()}>
                BACK
            </div>
            <div className={styles.registrationCard}>
                <div className={styles.title}>Create Account</div>
                {Outlet}
            </div>
        </div>
    );
}

export default Registration;
