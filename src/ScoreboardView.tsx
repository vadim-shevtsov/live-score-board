import React, { useState } from "react";
import { Scoreboard } from "./Scoreboard";
import type { Match } from "./Scoreboard";

export const ScoreboardView: React.FC = () => {
  const [board] = useState(() => new Scoreboard());
  const [matches, setMatches] = useState<Match[]>([]);
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    board.startMatch(home, away);
    setHome("");
    setAway("");
    setMatches(board.getSummary());
  };

  const handleFinish = (id: string) => {
    board.finishMatch(id);
    setMatches(board.getSummary());
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMatchId) return;
    board.updateScore(activeMatchId, Number(homeScore), Number(awayScore));
    setMatches(board.getSummary());
    setHomeScore("");
    setAwayScore("");
    setActiveMatchId(null);
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
            <button onClick={() => handleFinish(m.id)}>Finish Match</button>
            <button
              onClick={() => {
                setActiveMatchId(m.id);
                setHomeScore(String(m.homeScore));
                setAwayScore(String(m.awayScore));
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {activeMatchId && (
        <form onSubmit={handleUpdate}>
          <label>
            {matches.find((m) => m.id === activeMatchId)?.home} score
            <input
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              aria-label="Home score"
              type="number"
              min="0"
            />
          </label>
          <label>
            {matches.find((m) => m.id === activeMatchId)?.away} score
            <input
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              aria-label="Away score"
              type="number"
              min="0"
            />
          </label>
          <button type="submit">Update Score</button>
        </form>
      )}
    </div>
  );
};
