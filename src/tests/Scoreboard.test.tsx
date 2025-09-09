import { render, screen, fireEvent } from "@testing-library/react";

import { ScoreboardView } from "../ScoreboardView";

describe("ScoreboardView", () => {
  it("allows creating a match and shows it in the summary", () => {
    render(<ScoreboardView />);

    fireEvent.change(screen.getByLabelText(/home team/i), {
      target: { value: "Brasil" },
    });
    fireEvent.change(screen.getByLabelText(/away team/i), {
      target: { value: "Italy" },
    });

    fireEvent.click(screen.getByRole("button", { name: /start match/i }));

    expect(
      screen.getByText(/brasil 0 - italy 0/i)
    ).toBeInTheDocument();
  });

  it("doesn't allow empty team names", () => {
    render(<ScoreboardView />);
    fireEvent.click(screen.getByRole("button", { name: /start match/i }));

    expect(screen.queryByText(/0 -/)).not.toBeInTheDocument();
  });
});
