import { ref } from 'vue';

const boost = ref<Record<string, any> | null>(null);

export function useBoost() {
  return {
    boost,
  };
}