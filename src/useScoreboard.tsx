import { useState } from "react";
import { Scoreboard } from "./Scoreboard";
import type { Match } from "./Scoreboard";

export const useScoreboard = () => {
  const [board] = useState(() => new Scoreboard());
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  const startMatch = (home: string, away: string) => {
    board.startMatch(home, away);
    setMatches(board.getSummary());
  };

  const finishMatch = (id: string) => {
    board.finishMatch(id);
    setMatches(board.getSummary());
  };

  const updateScore = (id: string, homeScore: number, awayScore: number) => {
    board.updateScore(id, homeScore, awayScore);
    setMatches(board.getSummary());
  };

  return {
    matches,
    activeMatchId,
    setActiveMatchId,
    startMatch,
    finishMatch,
    updateScore,
  };
};
