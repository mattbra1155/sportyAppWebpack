<template>
  <el-card class="league-card" shadow="hover" @click="$emit('select', league)">
    <h3 class="league-card__title">{{ league.strLeague }}</h3>
    <span class="league-card__sport">{{ league.strSport }}</span>
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
  border: none;
  border-radius: 12px;
  border-top: 3px solid var(--sporty-red);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(23, 24, 28, 0.16) !important;
  }

  &__title {
    margin: 0 0 10px;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--sporty-black);
  }

  &__sport {
    display: inline-block;
    background: var(--sporty-green);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
    margin-bottom: 8px;
  }

  &__alt {
    margin: 8px 0 0;
    color: var(--sporty-grey);
    font-size: 0.85rem;
  }
}
</style>
