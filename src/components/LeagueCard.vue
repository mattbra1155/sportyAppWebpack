<template>
  <el-card class="league-card" shadow="hover" @click="$emit('select', league)">
    <h3 class="league-card__title">{{ league.strLeague }}</h3>
    <p class="league-card__sport">{{ league.strSport }}</p>
    <p class="league-card__alt">{{ league.strLeagueAlternate || 'No alternate name' }}</p>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { League } from '@/types/league';

export default defineComponent({
  name: 'LeagueCard',
  props: {
    league: {
      type: Object as PropType<League>,
      required: true,
    },
  },
  emits: ['select'],
});
</script>

<style lang="scss" scoped>
.league-card {
  cursor: pointer;
  text-align: left;
  height: 100%;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__title {
    margin: 0 0 8px;
    font-size: 1.1rem;
  }

  &__sport {
    margin: 0 0 4px;
    color: #409eff;
    font-weight: 600;
  }

  &__alt {
    margin: 0;
    color: #909399;
    font-size: 0.85rem;
  }
}
</style>
