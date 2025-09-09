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
    if (!home.trim() || !away.trim() || home === away) return;

    const match: Match = {
      id: String(++this.idCounter),
      home,
      away,
      homeScore: 0,
      awayScore: 0,
      order: ++this.seq,
    };
    this.matches.push(match);
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
