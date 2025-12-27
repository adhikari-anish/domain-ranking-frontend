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

// Provide ambient types for Vite-like import.meta.env so TS knows about env
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE?: string;
    [key: string]: unknown;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Later we’ll switch this to the real backend:
// const API_BASE = import.meta.env.VITE_API_BASE as string;

// function makeFakeSeries(domain: string): DomainRanks {
//   const today = new Date();
//   const ranks: RankPoint[] = [];

//   let base = Math.floor(1000 + Math.random() * 9000);

//   for (let i = 13; i >= 0; i--) {
//     const d = new Date(today);
//     d.setDate(today.getDate() - i);

//     base += Math.floor((Math.random() - 0.5) * 120);
//     if (base < 1) base = 1;

//     ranks.push({
//       date: d.toISOString().slice(0, 10),
//       rank: base,
//     });
//   }

//   return { domain, ranks };
// }

export async function fetchRankings(domains: string[]): Promise<RankingResponse> {
  const API_BASE = import.meta.env.VITE_API_BASE as string;
  console.log(domains);
  
  const joined = domains.join(",");

  const res = await fetch(`${API_BASE}/ranking/${encodeURIComponent(joined)}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);

  return (await res.json()) as RankingResponse;
}
