import React from "react";
import { useScoreboard } from "./useScoreboard";
import { StartMatchForm } from "./components/StartMatchForm";
import { MatchList } from "./components/MatchList";
import { UpdateMatchForm } from "./components/UpdateMatchForm";

export const ScoreboardView: React.FC = () => {
  const {
    matches,
    activeMatchId,
    setActiveMatchId,
    startMatch,
    finishMatch,
    updateScore,
    error,
  } = useScoreboard();

  const activeMatch = matches.find((m) => m.id === activeMatchId) || null;

  return (
    <div>
      <h2>Live Football World Cup Scoreboard</h2>
      <StartMatchForm onSubmit={startMatch} error={error} />

      {matches.length > 0 && (
        <>
          <h3>Summary</h3>
          <MatchList
            matches={matches}
            onFinish={finishMatch}
            onEdit={setActiveMatchId}
          />
        </>
      )}

      {activeMatch && (
        <UpdateMatchForm
          match={activeMatch}
          onUpdate={(homeScore, awayScore) => {
            updateScore(activeMatch.id, homeScore, awayScore);
            setActiveMatchId(null);
          }}
          onCancel={() => setActiveMatchId(null)}
        />
      )}
    </div>
  );
};
