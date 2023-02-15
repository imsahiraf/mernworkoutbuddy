import { render, screen,cleanup } from "@testing-library/react";
import WorkOut from '../WorkOut';

test("should render a workout", () => {
    render(<WorkOut />);
    const linkElement = screen.getByText(/workout/i)
    expect(linkElement).toBeInTheDocument();
})