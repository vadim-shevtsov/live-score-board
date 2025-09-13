import { render, screen, fireEvent } from "@testing-library/react";
import { ScoreboardView } from "../ScoreboardView";

// helper to render and start a match
const setupMatch = (home: string, away: string) => {
  fireEvent.change(screen.getByLabelText(/home team/i), {
    target: { value: home },
  });
  fireEvent.change(screen.getByLabelText(/away team/i), {
    target: { value: away },
  });
  fireEvent.click(screen.getByRole("button", { name: /start match/i }));
};

describe("Scoreboard integration", () => {
  it("allows starting a match", () => {
    render(<ScoreboardView />);
    setupMatch("Mexico", "Canada");

    expect(screen.getByText(/mexico 0 - canada 0/i)).toBeInTheDocument();
  });

  it("allows finishing a match", () => {
    render(<ScoreboardView />);
    setupMatch("Mexico", "Canada");

    fireEvent.click(screen.getByRole("button", { name: /finish match/i }));

    // the match should disappear after clicking finish
    expect(
      screen.queryByText(/mexico 0 - canada 0/i)
    ).not.toBeInTheDocument();
  });

  it("allows updating the score of an existing match", () => {
    render(<ScoreboardView />);
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

  it("orders matches by total score", () => {
    render(<ScoreboardView />);
    setupMatch("Mexico", "Canada");
    setupMatch("Spain", "Brazil");
  
    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[1]);
    fireEvent.change(screen.getByLabelText(/mexico score/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/canada score/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update score/i }));
  
    // Mexico vs Canada has total 2, should be listed first
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items[0]).toMatch(/mexico 1 - canada 1/i);
  });

  it("does not allow invalid matches", () => {
    render(<ScoreboardView />);

    // same team
    setupMatch("Mexico", "Mexico");
    expect(screen.getByText(/invalid match/i)).toBeInTheDocument();

    // empty team
    setupMatch("", "Canada");
    expect(screen.getByText(/invalid match/i)).toBeInTheDocument();
  });

  it("shows error if a team is already playing in another match", () => {
    render(<ScoreboardView />);
    setupMatch("Mexico", "Canada");
    expect(screen.getByText(/mexico 0 - canada 0/i)).toBeInTheDocument();
  
    // Try to reuse "Mexico"
    setupMatch("Mexico", "Brazil");
    expect(screen.getByText(/invalid match/i)).toBeInTheDocument();
  });
});

