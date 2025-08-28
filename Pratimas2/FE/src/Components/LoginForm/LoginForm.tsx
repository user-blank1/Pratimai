import React, { useState } from "react";
import styles from "./RegForm.module.scss";
// @ts-expect-error: wdhbwuoadyibkwuadhgv
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
function RegForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login(email, password);
        setEmail("");
        setPassword("");
        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 200);
        }
    };

    return (
        <form className={styles.regForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />
            </div>
            <button disabled={isLoading} className={styles.button} type="submit">
                Login
            </button>
            <div id="error" className={styles.error}>
                {error}
            </div>
        </form>
    );
}

export default RegForm;
