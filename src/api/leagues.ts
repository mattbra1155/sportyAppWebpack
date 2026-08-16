import { httpClient } from './httpClient';
import type { AllLeaguesResponse, League, SearchLeaguesResponse } from '@/types/league';

// The free/test API key caps /all_leagues.php to a handful of Soccer-only entries,
// so we supplement it with per-sport lookups to surface other sport types too.
const SUPPLEMENTARY_SPORTS = [
    'Basketball',
    'Motorsport',
    'Ice Hockey',
    'Baseball',
    'American Football',
    'Rugby',
    'Cricket',
    'Tennis',
];

async function fetchLeaguesBySport(sport: string): Promise<League[]> {
    const { data } = await httpClient.get<SearchLeaguesResponse>('/search_all_leagues.php', {
        params: { s: sport },
    });
    return data.countries ?? [];
}

export async function fetchAllLeagues(): Promise<League[]> {
    const [{ data }, bySport] = await Promise.all([
        httpClient.get<AllLeaguesResponse>('/all_leagues.php'),
        Promise.all(SUPPLEMENTARY_SPORTS.map(fetchLeaguesBySport)),
    ]);

    const merged = new Map<string, League>();
    for (const league of [...(data.leagues ?? []), ...bySport.flat()]) {
        merged.set(league.idLeague, league);
    }
    return Array.from(merged.values());
}
