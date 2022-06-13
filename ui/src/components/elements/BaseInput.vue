<script setup lang="ts">
defineProps<{
  label?: string
  modelValue?: any
}>()

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="relative">
    <label class="label" v-if="label">{{ label }}</label>
    <input class="input" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" v-bind="$attrs" />
  </div>
</template>