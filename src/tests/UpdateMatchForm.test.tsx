import { render, screen, fireEvent } from "@testing-library/react";
import { UpdateMatchForm } from "../components/UpdateMatchForm";
import type { Match } from "../Scoreboard";

const match: Match = {
  id: "1",
  home: "Mexico",
  away: "Canada",
  homeScore: 0,
  awayScore: 0,
  order: 1,
};

describe("UpdateMatchForm", () => {
  it("updates score on submit", () => {
    const onUpdate = jest.fn();
    render(<UpdateMatchForm match={match} onUpdate={onUpdate} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/mexico score/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/canada score/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update score/i }));

    expect(onUpdate).toHaveBeenCalledWith(2, 1);
  });

  it("calls onCancel when Cancel is clicked", () => {
    const onCancel = jest.fn();
    render(<UpdateMatchForm match={match} onUpdate={jest.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
