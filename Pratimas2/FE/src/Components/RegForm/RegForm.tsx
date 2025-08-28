import React, { useState } from "react";
import styles from "./RegForm.module.scss";
// @ts-expect-error: wdhbwuoadyibkwuadhgv
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
function RegForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await signup(email, password, username);
        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 200);
        }
    };

    return (
        <form className={styles.regForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
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
                Register
            </button>
            <div id="error" className={styles.error}>
                {error}
            </div>
        </form>
    );
}

export default RegForm;
