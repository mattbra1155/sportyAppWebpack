<template>
  <el-input :model-value="modelValue" placeholder="Search leagues by name..." clearable class="search-bar"
    @update:model-value="$emit('update:modelValue', $event)">
    <template #prefix>
      <el-icon>
        <Search />
      </el-icon>
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Search } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'SearchBar',
  components: { Search },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="less" scoped>
.search-bar {
  width: 100%;
  max-width: 320px;

  :deep(.el-input__wrapper) {
    border-radius: 999px;
    padding: 4px 16px;
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--sporty-red) inset;
  }
}
</style>
