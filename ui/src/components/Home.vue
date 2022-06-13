<script setup lang="ts">
import { ref } from 'vue';
import LockIcon from './LockIcon.vue';
import EditIcon from './EditIcon.vue';
import { useTokens } from '../composables/useTokens';

const allowedTokens = ref<string[]>([]);
const tokenInput = ref<string>('');
const approvalAmountInput = ref<number>(0);

const { selectedToken } = useTokens();
</script>

<template>
  <div class="flex flex-col space-y-3">
    <p class="text-gray-400 text-center">Allow boost to move tokens<br />on your behalf.</p>
    <div class="relative">
      <div class="avatar absolute left-2 top-2" :class="{ '!bg-gray-200': !tokenInput }" />
      <input v-model="tokenInput" type="text" class="input w-80 !pl-10" placeholder="Enter token address" />
    </div>
    <input v-model="approvalAmountInput" type="text" class="input-amount w-80" placeholder="0.0" />
    <button
      @click="allowedTokens.push('0x1230000000000000000000000000000000000000')"
      class="button button-big button-primary w-80"
    >
      {{ allowedTokens.includes(tokenInput) ? 'Update authorization' : 'Issue authorization' }}
    </button>
    <div class="space-y-3">
      <div
        v-for="token in allowedTokens" :key="token"
        class="w-80 bg-gray-100 py-3 px-4 rounded-lg"
      >
        <div class="flex space-x-3 items-center">
          <div class="avatar" />
          <div>Snapshot</div>
          <div>280.6 SNP</div>
          <div class="!ml-auto flex space-x-1">
            <button
              class="button button-pill button-primary"
              @click="tokenInput = token; approvalAmountInput = 280.6"
            >
              <EditIcon class="w-4 h-4" />
            </button>
            <button
              class="button button-pill button-primary"
              @click="selectedToken = token"
            >
              <LockIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>