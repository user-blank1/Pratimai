import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error: blah blah
import { AuthContextProvider } from "../context/AuthContext.jsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </StrictMode>
);
