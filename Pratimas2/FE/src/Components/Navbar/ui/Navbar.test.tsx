import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import RegForm from "../../RegForm/RegForm.tsx"; // adjust path as needed

it("should redirect to register page upon clicking register", async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route path="/auth/register" element={<RegForm />} />
            </Routes>
        </MemoryRouter>
    );
    const registerLink = screen.getByText("Register");
    expect(registerLink).toBeInTheDocument();
    fireEvent.click(registerLink);
    await waitFor(() => {
        const text = screen.getByText("Register");
        expect(text).toBeInTheDocument();
    });
});
