import { Module } from 'vuex';
import { fetchAllLeagues } from '@/api/leagues';
import type { League } from '@/types/league';
import type { RootState } from '@/store/types';

export interface LeaguesState {
  leagues: League[];
  loading: boolean;
  error: string | null;
  searchText: string;
  selectedSport: string;
}

const ALL_SPORTS = '';

const leagues: Module<LeaguesState, RootState> = {
  namespaced: true,
  state: (): LeaguesState => ({
    leagues: [],
    loading: false,
    error: null,
    searchText: '',
    selectedSport: ALL_SPORTS,
  }),
  getters: {
    sportOptions(state): string[] {
      const sports = new Set(state.leagues.map((league) => league.strSport));
      return Array.from(sports).sort();
    },
    filteredLeagues(state): League[] {
      const search = state.searchText.trim().toLowerCase();
      return state.leagues.filter((league) => {
        const matchesSport = !state.selectedSport || league.strSport === state.selectedSport;
        const matchesSearch =
          !search ||
          league.strLeague.toLowerCase().includes(search) ||
          (league.strLeagueAlternate ?? '').toLowerCase().includes(search);
        return matchesSport && matchesSearch;
      });
    },
  },
  mutations: {
    setLeagues(state, leagues: League[]) {
      state.leagues = leagues;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
    setSearchText(state, searchText: string) {
      state.searchText = searchText;
    },
    setSelectedSport(state, sport: string) {
      state.selectedSport = sport;
    },
  },
  actions: {
    async fetchLeagues({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const leagues = await fetchAllLeagues();
        commit('setLeagues', leagues);
      } catch {
        commit('setError', 'Failed to load leagues. Please try again later.');
      } finally {
        commit('setLoading', false);
      }
    },
  },
};

export default leagues;
