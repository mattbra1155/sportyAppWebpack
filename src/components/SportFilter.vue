<template>
  <el-select
    :model-value="modelValue"
    placeholder="All sports"
    clearable
    class="sport-filter"
    @update:model-value="$emit('update:modelValue', $event ?? '')"
  >
    <el-option
      v-for="sport in sports"
      :key="sport"
      :label="sport"
      :value="sport"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SportFilter',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    sports: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="less" scoped>
.sport-filter {
  width: 100%;
  max-width: 220px;
}
</style>
