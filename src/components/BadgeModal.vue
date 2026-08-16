<template>
  <el-dialog :model-value="visible" :title="league?.strLeague" width="360px"
    @update:model-value="$emit('update:visible', $event)">
    <div class="badge-modal">
      <el-icon v-if="loading" class="is-loading badge-modal__spinner">
        <Loading />
      </el-icon>
      <img v-else-if="badge?.strBadge" :src="badge.strBadge" :alt="`${league?.strLeague} season badge`"
        class="badge-modal__image" />
      <p v-else class="badge-modal__empty">No season badge available for this league.</p>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import type { League, SeasonBadge } from '@/types/league';

export default defineComponent({
  name: 'BadgeModal',
  components: { Loading },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    league: {
      type: Object as PropType<League | null>,
      default: null,
    },
    badge: {
      type: Object as PropType<SeasonBadge | null>,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
});
</script>

<style lang="less" scoped>
.badge-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 160px;

  &__image {
    max-width: 100%;
    max-height: 300px;
  }

  &__spinner {
    font-size: 32px;
    color: var(--sporty-red);
  }

  &__empty {
    color: var(--sporty-grey);
  }
}

:deep(.el-dialog__title) {
  font-weight: 700;
  color: var(--sporty-black);
}
</style>
