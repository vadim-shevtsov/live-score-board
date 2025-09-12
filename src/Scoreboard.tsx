export interface Match {
  id: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  order: number; // a sequence for ordering
}

export class Scoreboard {
  private matches: Match[] = [];
  private seq = 0;
  private idCounter = 0;

  startMatch(home: string, away: string) {
    if (!home.trim() || !away.trim() || home.toLowerCase() === away.toLowerCase()) {
      return false;
    }

    // prevent duplicate teams (a team cannot play two matches simultaneously)
    const teamAlreadyPlaying = this.matches.some(
      (m) => m.home === home || m.away === home || m.home === away || m.away === away
    );
    if (teamAlreadyPlaying) return false;

    const match: Match = {
      id: String(++this.idCounter),
      home,
      away,
      homeScore: 0,
      awayScore: 0,
      order: ++this.seq,
    };
    this.matches.push(match);
    return true;
  }

  finishMatch(id: string) {
    this.matches = this.matches.filter((m) => m.id !== id);
  }

  updateScore(id: string, homeScore: number, awayScore: number): boolean {
    const match = this.matches.find((m) => m.id === id);
    if (!match) return false;
    if (homeScore < 0 || awayScore < 0) return false;
  
    match.homeScore = homeScore;
    match.awayScore = awayScore;
    return true;
  }

  getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const totalA = a.homeScore + a.awayScore;
      const totalB = b.homeScore + b.awayScore;
      if (totalA !== totalB) return totalB - totalA;
      return b.order - a.order;
    });
  }
}
