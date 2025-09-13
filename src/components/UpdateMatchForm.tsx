import React, { useState } from "react";
import type { Match } from "../Scoreboard";

interface UpdateMatchFormProps {
  match: Match;
  onUpdate: (homeScore: number, awayScore: number) => void;
  onCancel: () => void;
}

export const UpdateMatchForm: React.FC<UpdateMatchFormProps> = ({
  match,
  onUpdate,
  onCancel,
}) => {
  const [homeScore, setHomeScore] = useState(String(match.homeScore));
  const [awayScore, setAwayScore] = useState(String(match.awayScore));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(Number(homeScore), Number(awayScore));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {match.home} score
        <input
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
          type="number"
          min="0"
        />
      </label>
      <label>
        {match.away} score
        <input
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          type="number"
          min="0"
        />
      </label>
      <button type="submit">Update Score</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
