import React, { useState } from "react";

interface StartMatchFormProps {
  onSubmit: (home: string, away: string) => void;
  error?: string | null;
}

export const StartMatchForm: React.FC<StartMatchFormProps> = ({ onSubmit, error }) => {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(home, away);
    setHome("");
    setAway("");
  };

  return (
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
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
