<template>
  <div class="home">
    <h1 class="home__title">Sports Leagues</h1>

    <div class="home__filters">
      <SearchBar v-model="searchText" />
      <SportFilter v-model="selectedSport" :sports="sportOptions" />
    </div>

    <el-alert v-if="error" :title="error" type="error" show-icon class="home__error" />

    <div v-if="loading" class="home__loading">
      <el-icon class="is-loading" :size="32"><Loading /></el-icon>
    </div>

    <template v-else>
      <p class="home__count">{{ filteredLeagues.length }} league(s) found</p>
      <div class="home__grid">
        <LeagueCard
          v-for="league in filteredLeagues"
          :key="league.idLeague"
          :league="league"
          @select="openBadge"
        />
      </div>
    </template>

    <BadgeModal
      v-model:visible="badgeModalVisible"
      :league="selectedLeague"
      :badge="selectedBadge"
      :loading="badgeLoading"
    />
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
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  text-align: left;

  &__title {
    text-align: center;
    margin-bottom: 24px;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
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
    color: #909399;
    margin: 0 0 12px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .home__filters {
    flex-direction: column;
  }
}
</style>
