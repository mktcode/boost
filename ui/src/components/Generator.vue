<script setup lang="ts">
import { useTokens } from '../composables/useTokens';
import { useBoost } from '../composables/useBoost';

const { selectedToken } = useTokens();
const { boost } = useBoost();
</script>

<template>
  <div class="max-w-xl mt-6">
    <h3 class="font-bold leading-10 text-gray-300">
      SNAP Coupons
    </h3>
    <div class="flex space-x-12">
      <div class="flex flex-col">
        <div class="text-2xl font-bold text-gray-900">What generator do  you want to use?</div>
        <div class="text-gray-500 mt-4">
          You can generate a list of coupons for your users to redeem.
        </div>
      </div>
      <div class="flex flex-col space-y-3">
        <button class="button button-small button-secondary w-56" @click="boost = null; selectedToken = null">
          <svg class="w-6 h-6 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>
          snapshot votes
        </button>
        <button class="button button-small button-secondary w-56" @click="boost = null; selectedToken = null">
          <svg class="w-6 h-6 text-gray-300 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          upload json
        </button>
      </div>
    </div>
  </div>
</template>