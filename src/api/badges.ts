import { httpClient } from './httpClient';
import type { SeasonBadgeResponse, SeasonBadge } from '@/types/league';

// Returns the first season that actually has a badge image, or null if none exists.
export async function fetchSeasonBadge(idLeague: string): Promise<SeasonBadge | null> {
    const { data } = await httpClient.get<SeasonBadgeResponse>('/search_all_seasons.php', {
        params: { badge: 1, id: idLeague },
    });
    const seasons = data.seasons ?? [];
    return seasons.find((season) => !!season.strBadge) ?? null;
}
