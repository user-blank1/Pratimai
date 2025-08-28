import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm.tsx";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../hooks/useLogin", () => ({
    useLogin: () => ({
        login: jest.fn(async () => true),
        error: null,
        isLoading: false,
    }),
}));

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => () => {},
    };
});

it("renders the input field", () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeInTheDocument();
});

it("contains text after typing", async () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect((input as HTMLInputElement).value).toBe("test@example.com");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect((passwordInput as HTMLInputElement).value).toBe("password123");
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.click(button);

    await waitFor(
        () => {
            const updatedInput = screen.getByPlaceholderText("Enter your email");
            expect((updatedInput as HTMLInputElement).value).toBe("");
        },
        { timeout: 1000 }
    );
});
