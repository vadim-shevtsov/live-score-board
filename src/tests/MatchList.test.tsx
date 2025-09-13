import { render, screen, fireEvent } from "@testing-library/react";
import { MatchList } from "../components/MatchList";
import type { Match } from "../Scoreboard";

const matches: Match[] = [
  { id: "1", home: "Mexico", away: "Canada", homeScore: 0, awayScore: 0, order: 1 },
];

describe("MatchList", () => {
  it("renders matches", () => {
    render(<MatchList matches={matches} onFinish={jest.fn()} onEdit={jest.fn()} />);
    expect(screen.getByText(/mexico 0 - canada 0/i)).toBeInTheDocument();
  });

  it("calls onFinish when Finish button is clicked", () => {
    const onFinish = jest.fn();
    render(<MatchList matches={matches} onFinish={onFinish} onEdit={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /finish match/i }));
    expect(onFinish).toHaveBeenCalledWith("1");
  });

  it("calls onEdit when Edit button is clicked", () => {
    const onEdit = jest.fn();
    render(<MatchList matches={matches} onFinish={jest.fn()} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith("1");
  });
});
