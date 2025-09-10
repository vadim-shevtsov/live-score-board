import { render, screen, fireEvent } from "@testing-library/react";

import { ScoreboardView } from "../ScoreboardView";

describe("ScoreboardView", () => {
  it("allows creating a match and shows it in the summary", () => {
    render(<ScoreboardView />);

    fireEvent.change(screen.getByLabelText(/home team/i), {
      target: { value: "Mexico" },
    });
    fireEvent.change(screen.getByLabelText(/away team/i), {
      target: { value: "Canada" },
    });

    fireEvent.click(screen.getByRole("button", { name: /start match/i }));

    expect(
      screen.getByText(/mexico 0 - canada 0/i)
    ).toBeInTheDocument();
  });

  it("doesn't allow empty team names", () => {
    render(<ScoreboardView />);
    fireEvent.click(screen.getByRole("button", { name: /start match/i }));

    expect(screen.queryByText(/0 -/)).not.toBeInTheDocument();
  });

  it("allows finishing a match (removes it from summary)", () => {
    render(<ScoreboardView />);

    fireEvent.change(screen.getByLabelText(/home team/i), {
      target: { value: "Mexico" },
    });
    fireEvent.change(screen.getByLabelText(/away team/i), {
      target: { value: "Canada" },
    });
    fireEvent.click(screen.getByRole("button", { name: /start match/i }));
    expect(screen.getByText(/mexico 0 - canada 0/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /finish match/i }));

    // the match should disappear after clicking finish
    expect(screen.queryByText(/mexico 0 - canada 0/i)).not.toBeInTheDocument();
  });
});
