import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, username) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username }),
        });
        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            setIsLoading(false);
            return false;
        }
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data }); //BE response: res.status(201).json({ user: { id: user._id, username, email }, token });
        setIsLoading(false);
        return true;
    };

    return { signup, error, isLoading };
};
