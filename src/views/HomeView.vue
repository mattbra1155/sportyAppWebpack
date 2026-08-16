<template>
  <div class="home">
    <header class="home__hero">
      <div class="home__hero-inner">
        <span class="home__eyebrow">Sporty Group</span>
        <h1 class="home__title">SPORTS FOR EVERYBODY</h1>
        <p class="home__subtitle">Browse every league. Find the badge. Follow the game.</p>
      </div>
    </header>

    <div class="home__content">
      <div class="home__filters">
        <SearchBar v-model="searchText" />
        <SportFilter v-model="selectedSport" :sports="sportOptions" />
      </div>

      <el-alert v-if="error" :title="error" type="error" show-icon class="home__error" />

      <div v-if="loading" class="home__loading">
        <el-icon class="is-loading" :size="32">
          <Loading />
        </el-icon>
      </div>

      <template v-else>
        <p class="home__count">{{ filteredLeagues.length }} league(s) found</p>
        <div class="home__grid">
          <LeagueCard v-for="league in filteredLeagues" :key="league.idLeague" :league="league" @select="openBadge" />
        </div>
      </template>
    </div>

    <BadgeModal v-model:visible="badgeModalVisible" :league="selectedLeague" :badge="selectedBadge"
      :loading="badgeLoading" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { Loading } from '@element-plus/icons-vue';
import SearchBar from '@/components/SearchBar.vue';
import SportFilter from '@/components/SportFilter.vue';
import LeagueCard from '@/components/LeagueCard.vue';
import BadgeModal from '@/components/BadgeModal.vue';
import type { League } from '@/types/league';

export default defineComponent({
  name: 'HomeView',
  components: { SearchBar, SportFilter, LeagueCard, BadgeModal, Loading },
  setup() {
    const store = useStore();

    store.dispatch('leagues/fetchLeagues');

    const searchText = computed({
      get: () => store.state.leagues.searchText,
      set: (value: string) => store.commit('leagues/setSearchText', value),
    });
    const selectedSport = computed({
      get: () => store.state.leagues.selectedSport,
      set: (value: string) => store.commit('leagues/setSelectedSport', value),
    });

    const loading = computed(() => store.state.leagues.loading);
    const error = computed(() => store.state.leagues.error);
    const sportOptions = computed(() => store.getters['leagues/sportOptions']);
    const filteredLeagues = computed(() => store.getters['leagues/filteredLeagues']);

    const selectedLeague = ref<League | null>(null);
    const badgeModalVisible = ref(false);
    const badgeLoading = computed(() => store.state.badges.loadingId === selectedLeague.value?.idLeague);
    const selectedBadge = computed(() => {
      const league = selectedLeague.value;
      if (!league) return null;
      return store.getters['badges/getBadge'](league.idLeague) ?? null;
    });

    async function openBadge(league: League) {
      selectedLeague.value = league;
      badgeModalVisible.value = true;
      await store.dispatch('badges/fetchBadge', league.idLeague);
    }

    return {
      searchText,
      selectedSport,
      loading,
      error,
      sportOptions,
      filteredLeagues,
      selectedLeague,
      badgeModalVisible,
      badgeLoading,
      selectedBadge,
      openBadge,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  min-height: 100vh;
  text-align: left;

  &__hero {
    background: linear-gradient(135deg, var(--sporty-red) 0%, var(--sporty-red-dark) 100%);
    padding: 56px 16px 64px;
    text-align: center;
  }

  &__hero-inner {
    max-width: 1080px;
    margin: 0 auto;
  }

  &__eyebrow {
    display: inline-block;
    color: #fff;
    background: rgba(0, 0, 0, 0.25);
    padding: 4px 14px;
    border-radius: 999px;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 16px;
  }

  &__title {
    color: #fff;
    font-family: 'Barlow Condensed', 'Barlow', sans-serif;
    font-weight: 800;
    font-size: 3rem;
    letter-spacing: 0.02em;
    margin: 0 0 12px;
    text-transform: uppercase;
  }

  &__subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.05rem;
    margin: 0;
  }

  &__content {
    max-width: 1080px;
    margin: -32px auto 0;
    padding: 0 16px 48px;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    background: #fff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(23, 24, 28, 0.12);
    margin-bottom: 20px;
  }

  &__error {
    margin-bottom: 16px;
  }

  &__loading {
    display: flex;
    justify-content: center;
    padding: 48px 0;
  }

  &__count {
    color: var(--sporty-grey);
    font-weight: 600;
    margin: 0 0 12px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .home__title {
    font-size: 2.1rem;
  }

  .home__filters {
    flex-direction: column;
  }
}
</style>
