import React from "react";
import type { Match } from "../Scoreboard";

interface MatchListProps {
  matches: Match[];
  onFinish: (id: string) => void;
  onEdit: (id: string) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  matches,
  onFinish,
  onEdit,
}) => {
  return (
    <ul>
      {matches.map((m) => (
        <li key={m.id}>
          {m.home} {m.homeScore} - {m.away} {m.awayScore}
          <button onClick={() => onFinish(m.id)}>Finish Match</button>
          <button onClick={() => onEdit(m.id)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};
