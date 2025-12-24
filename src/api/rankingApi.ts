// src/api/rankingApi.ts

export type RankPoint = {
  date: string; // YYYY-MM-DD
  rank: number;
};

export type DomainRanks = {
  domain: string;
  ranks: RankPoint[];
};

export type RankingResponse = {
  domains: DomainRanks[];
};

// Later we’ll switch this to the real backend:
// const API_BASE = import.meta.env.VITE_API_BASE as string;

function makeFakeSeries(domain: string): DomainRanks {
  const today = new Date();
  const ranks: RankPoint[] = [];

  let base = Math.floor(1000 + Math.random() * 9000);

  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    base += Math.floor((Math.random() - 0.5) * 120);
    if (base < 1) base = 1;

    ranks.push({
      date: d.toISOString().slice(0, 10),
      rank: base,
    });
  }

  return { domain, ranks };
}

export async function fetchRankings(domains: string[]): Promise<RankingResponse> {
  // simulate delay
  await new Promise((r) => setTimeout(r, 600));
  return { domains: domains.map(makeFakeSeries) };
}
