import { useState } from "react";
import { Scoreboard } from "./Scoreboard";
import type { Match } from "./Scoreboard";

export const useScoreboard = () => {
  const [board] = useState(() => new Scoreboard());
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startMatch = (home: string, away: string) => {
    const ok = board.startMatch(home, away);
    if (!ok) {
      setError("Invalid match. Teams must be non-empty, different, and not already playing.");
      return false;
    }
    setError(null);
    setMatches(board.getSummary());
    return true;
  };

  const finishMatch = (id: string) => {
    board.finishMatch(id);
    setMatches(board.getSummary());
  };

  const updateScore = (id: string, homeScore: number, awayScore: number) => {
    const ok = board.updateScore(id, homeScore, awayScore);
    if (!ok) {
      setError("Invalid score update. Scores must be non-negative.");
      return false;
    }
    setError(null);
    setMatches(board.getSummary());
    return true;
  };

  return {
    matches,
    activeMatchId,
    setActiveMatchId,
    startMatch,
    finishMatch,
    updateScore,
    error,
  };
};
