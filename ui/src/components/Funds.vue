<script setup lang="ts">
import { useTokens } from './../composables/useTokens';
import { useBoost } from '../composables/useBoost';

const { selectedToken } = useTokens();
const { boost } = useBoost();
</script>

<template>
  <div class="max-w-3xl mt-6">
    <h3 class="font-bold leading-10 text-gray-300">
      SNAP Coupons
    </h3>
    <div class="flex flex-col sm:flex-row items-start">
      <div>
        <div class="text-2xl font-bold text-gray-900">Allow withdrawals from your wallet?</div>
        <div class="text-gray-500 mt-4">
          Based on your allowance, boost can move tokens directly from your wallet.
          This leaves you in control over your funds but there's no guarantee that they will be available for coupons.
        </div>
      </div>
      <div class="ml-6 w-72">
        <input type="text" value="280.60" class="input-amount w-72" placeholder="0.0" />
        <button class="button button-big button-primary w-72 mt-3">
          Update authorization
        </button>
        <button class="button button-big button-primary w-72 mt-3" @click="boost = { token: selectedToken, allowanceFrom: '0x123' }">
          Use wallet allowance
        </button>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row items-start mt-12">
      <div>
        <div class="text-2xl font-bold text-gray-900">Move funds to the vault?</div>
        <div class="text-gray-500 mt-4">
          You give up control over the amount of tokens for a certain time. Coupons are guaranteed to receive a payout.
        </div>
      </div>
      <div class="ml-6 w-72">
        <input type="text" value="280.60" class="input-amount w-72" placeholder="0.0" />
        <input type="text" class="input w-72 mt-3" placeholder="Until YYYY-MM-DD H:M" />
        <button class="button button-big button-primary w-72 mt-3" @click="boost = { token: selectedToken, deposit: '1'}">
          Deposit
        </button>
      </div>
    </div>
  </div>
</template>