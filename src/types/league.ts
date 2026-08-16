export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
}

export interface AllLeaguesResponse {
  leagues: League[] | null;
}

export interface SeasonBadge {
  strSeason: string;
  strBadge: string | null;
}

export interface SeasonBadgeResponse {
  seasons: SeasonBadge[] | null;
}
