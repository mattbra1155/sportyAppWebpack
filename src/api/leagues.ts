import { httpClient } from './httpClient';
import type { AllLeaguesResponse, League } from '@/types/league';

export async function fetchAllLeagues(): Promise<League[]> {
  const { data } = await httpClient.get<AllLeaguesResponse>('/all_leagues.php');
  return data.leagues ?? [];
}
