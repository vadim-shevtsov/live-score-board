import { render, screen, fireEvent } from "@testing-library/react";
import { ScoreboardView } from "../ScoreboardView";

// helper to render and start a match
const setupMatch = (home: string, away: string) => {
  render(<ScoreboardView />);

  fireEvent.change(screen.getByLabelText(/home team/i), {
    target: { value: home },
  });
  fireEvent.change(screen.getByLabelText(/away team/i), {
    target: { value: away },
  });
  fireEvent.click(screen.getByRole("button", { name: /start match/i }));

  return screen;
};

describe("ScoreboardView", () => {
  it("allows starting a match", () => {
    setupMatch("Mexico", "Canada");

    expect(screen.getByText(/mexico 0 - canada 0/i)).toBeInTheDocument();
  });

  it("doesn't allow empty team names", () => {
    render(<ScoreboardView />);
    fireEvent.click(screen.getByRole("button", { name: /start match/i }));

    expect(screen.queryByText(/0 -/)).not.toBeInTheDocument();
  });

  it("allows finishing a match", () => {
    setupMatch("Mexico", "Canada");

    fireEvent.click(screen.getByRole("button", { name: /finish match/i }));

    // the match should disappear after clicking finish
    expect(
      screen.queryByText(/mexico 0 - canada 0/i)
    ).not.toBeInTheDocument();
  });

  it("allows updating the score of an existing match", () => {
    setupMatch("Mexico", "Canada");

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.change(screen.getByLabelText(/mexico score/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/canada score/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update score/i }));

    expect(screen.getByText(/mexico 2 - canada 1/i)).toBeInTheDocument();
  });
});

