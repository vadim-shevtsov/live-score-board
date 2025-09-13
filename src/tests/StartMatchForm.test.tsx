import { render, screen, fireEvent } from "@testing-library/react";
import { StartMatchForm } from "../components/StartMatchForm";

describe("StartMatchForm", () => {
  it("calls onSubmit with team names", () => {
    const onSubmit = jest.fn();
    render(<StartMatchForm onSubmit={onSubmit} error={null} />);

    fireEvent.change(screen.getByLabelText(/home team/i), {
      target: { value: "Mexico" },
    });
    fireEvent.change(screen.getByLabelText(/away team/i), {
      target: { value: "Canada" },
    });
    fireEvent.click(screen.getByRole("button", { name: /start match/i }));

    expect(onSubmit).toHaveBeenCalledWith("Mexico", "Canada");
  });

  it("shows error message when provided", () => {
    render(<StartMatchForm onSubmit={jest.fn()} error="Invalid match" />);
    expect(screen.getByText(/invalid match/i)).toBeInTheDocument();
  });
});
