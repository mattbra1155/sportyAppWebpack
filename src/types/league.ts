export interface League {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string | null;
}

export interface AllLeaguesResponse {
    leagues: League[] | null;
}

// search_all_leagues.php nests its league results under "countries"
export interface SearchLeaguesResponse {
    countries: League[] | null;
}

export interface SeasonBadge {
    strSeason: string;
    strBadge: string | null;
}

export interface SeasonBadgeResponse {
    seasons: SeasonBadge[] | null;
}
