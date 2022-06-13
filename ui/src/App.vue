<script setup lang="ts">
import Generator from './components/Generator.vue';
import Funds from './components/Funds.vue';
import Home from './components/Home.vue';
import { useTokens } from './composables/useTokens';
import { useBoost } from './composables/useBoost';

const { selectedToken } = useTokens();
const { boost } = useBoost();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center flex-col bg-gradient-to-r from-gray-50 via-white to-gray-50">
    <h1
      class="flex items-center italic font-extrabold text-3xl cursor-pointer"
      @click="selectedToken = null"
    >
      <svg v-if="selectedToken" class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      <svg class="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
      Boost
    </h1>
    <Generator v-if="selectedToken && boost" />
    <Funds v-else-if="selectedToken" />
    <Home v-else />
  </div>
</template>