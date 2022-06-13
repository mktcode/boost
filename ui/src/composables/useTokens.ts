import { ref } from 'vue';

const selectedToken = ref<string | null>(null);

export function useTokens() {
  return {
    selectedToken,
  };
}