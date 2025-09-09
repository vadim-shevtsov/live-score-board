import React, { useState } from "react";
import { Scoreboard } from "./Scoreboard";
import type { Match } from "./Scoreboard";

export const ScoreboardView: React.FC = () => {
  const [board] = useState(() => new Scoreboard());
  const [matches, setMatches] = useState<Match[]>([]);
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    board.startMatch(home, away);
    setHome("");
    setAway("");
    setMatches(board.getSummary());
  };

  return (
    <div>
      <h2>Live Football World Cup Scoreboard</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Home team
          <input
            value={home}
            onChange={(e) => setHome(e.target.value)}
            aria-label="Home team"
          />
        </label>
        <label>
          Away team
          <input
            value={away}
            onChange={(e) => setAway(e.target.value)}
            aria-label="Away team"
          />
        </label>
        <button type="submit">Start Match</button>
      </form>

      <h3>Summary</h3>
      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            {m.home} {m.homeScore} - {m.away} {m.awayScore}
          </li>
        ))}
      </ul>
    </div>
  );
};
