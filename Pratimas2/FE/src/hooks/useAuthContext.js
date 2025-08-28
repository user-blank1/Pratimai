import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useReducer, useEffect } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};
