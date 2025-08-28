import { render, screen } from "@testing-library/react";
import ArticleForm from "./ArticleForm";
import { MemoryRouter } from "react-router-dom";

describe("renders the form", () => {
    it("renders form", () => {
        render(
            <MemoryRouter>
                <ArticleForm />
            </MemoryRouter>
        );
        const text = screen.getByText("Submit an Article");
        expect(text).toBeInTheDocument();
    });
});
