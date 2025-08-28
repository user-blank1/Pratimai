import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
    it("renders the footer", () => {
        render(<Footer />);
        const text = screen.getByText("Sign up for our newsletter");
        expect(text).toBeInTheDocument();
    });
});
