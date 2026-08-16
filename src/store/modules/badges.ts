import { Module } from 'vuex';
import { fetchSeasonBadge } from '@/api/badges';
import type { SeasonBadge } from '@/types/league';
import type { RootState } from '@/store/types';

export interface BadgesState {
    // null = fetched but no badge found; undefined = not fetched yet
    cache: Record<string, SeasonBadge | null>;
    loadingId: string | null;
}

const badges: Module<BadgesState, RootState> = {
    namespaced: true,
    state: (): BadgesState => ({
        cache: {},
        loadingId: null,
    }),
    getters: {
        getBadge: (state) => (idLeague: string): SeasonBadge | null | undefined => state.cache[idLeague],
    },
    mutations: {
        setBadge(state, { idLeague, badge }: { idLeague: string; badge: SeasonBadge | null }) {
            state.cache[idLeague] = badge;
        },
        setLoadingId(state, idLeague: string | null) {
            state.loadingId = idLeague;
        },
    },
    actions: {
        async fetchBadge({ state, commit }, idLeague: string) {
            // already cached (including "no badge found" result) - skip the API call
            if (Object.prototype.hasOwnProperty.call(state.cache, idLeague)) {
                return;
            }
            commit('setLoadingId', idLeague);
            try {
                const badge = await fetchSeasonBadge(idLeague);
                commit('setBadge', { idLeague, badge });
            } finally {
                commit('setLoadingId', null);
            }
        },
    },
};

export default badges;
