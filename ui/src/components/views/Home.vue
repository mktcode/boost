<script setup lang="ts">
import BaseInput from '../elements/BaseInput.vue'
import Layout from '../compositions/Layout.vue'
import { useWeb3 } from '../../composables/useWeb3'
import { computed, reactive, ref, watch } from 'vue';

import { CheckIcon, InformationCircleIcon, DownloadIcon, UserGroupIcon } from '@heroicons/vue/outline'

const { connect } = useWeb3()

const voters = ref([
  { id: 1, adddress: '0xd50cc74fad36ea02c2ede0207434db476884104b', vp: 1.4 },
  { id: 1, adddress: '0xd50cc74fad36ea02c2ede0207434db476884104b', vp: 10.1 },
  { id: 2, adddress: '0xd50cc74fad36ea02c2ede0207434db476884104b', vp: 11 },
  { id: 3, adddress: '0xd50cc74fad36ea02c2ede0207434db476884104b', vp: 62 },
  { id: 4, adddress: '0xd50cc74fad36ea02c2ede0207434db476884104b', vp: 123.5 },
])
voters.value = [...voters.value, ...voters.value, ...voters.value]
voters.value = [...voters.value, ...voters.value, ...voters.value]
voters.value = [...voters.value, ...voters.value, ...voters.value]
voters.value = [...voters.value, ...voters.value, ...voters.value]
voters.value = [...voters.value, ...voters.value, ...voters.value]
voters.value = [...voters.value, ...voters.value, ...voters.value]
voters.value = [...voters.value, ...voters.value, ...voters.value]

const depositAmount = ref(voters.value.length)
const claimAmount = reactive({
  min: 1,
  max: 1
})
const isFixedAmount = ref(true)
const smallestVp = computed(() => voters.value.reduce((acc, voter) => Math.min(acc, voter.vp), voters.value[0].vp))
const highestVp = computed(() => voters.value.reduce((acc, voter) => Math.max(acc, voter.vp), voters.value[0].vp))
const totalClaimAmount = computed(() => isFixedAmount.value ? voters.value.length * claimAmount.min : voters.value.reduce((totalAmount, voter) => {
  const claimMin = Number(claimAmount.min)
  const claimMax = Number(claimAmount.max)
  const extra = (((voter.vp - smallestVp.value) / (highestVp.value - smallestVp.value)) * (claimMax - claimMin))
  const newTotal = totalAmount + claimMin + extra
  return newTotal
}, 0))
const remainingAmount = computed(() => depositAmount.value - totalClaimAmount.value)

watch(() => claimAmount.min, () => {
  if (Number(claimAmount.min) > Number(claimAmount.max)) {
    claimAmount.max = claimAmount.min
  }
})

watch(() => claimAmount.max, () => {
  if (Number(claimAmount.max) < Number(claimAmount.min)) {
    claimAmount.min = claimAmount.max
  }
})

watch(claimAmount, () => depositAmount.value = totalClaimAmount.value)
watch(isFixedAmount, () => depositAmount.value = totalClaimAmount.value)

const proposalUrl = ref('')
const proposal = ref<{
  id: string,
  title: string,
  votes: number,
  state: string,
} | null>(null)

watch(proposalUrl, async () => {
  const proposalId = proposalUrl.value.split('/').pop()
  if (proposalId) {
    proposal.value = await fetch('https://hub.snapshot.org/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            proposal(id: "${proposalId}") {
              id
              title
              votes
              state
            }
          }`
      })
    }).then(res => res.json()).then(res => res.data.proposal)
  }
})



const downloadClaims = () => {
  if (proposal.value) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(voters.value));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `claims-proposal-${proposal.value.id}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}

const createBoost = async () => {
  connect()
}
</script>

<template>
  <Layout>
    <div class="bg-white rounded-xl p-2 max-w-sm">
      <BaseInput label="Proposal URL" placeholder="https://snapshot.org/..." type="text" v-model="proposalUrl" />
      <div v-if="proposal" class="space-y-2 mt-2">
        <div class="text-gray-800 font-bold text-xl bg-gray-100 rounded-xl px-3 py-2">
          {{ proposal.title }}
          <UserGroupIcon class="w-8 h-8 inline text-gray-300" />
          <div>{{ proposal.votes }} votes</div>
          {{ proposal.state }}
        </div>
        <div class="flex space-x-2">
          <BaseInput label="Start date" placeholder="Sat, Jun 4 22, 10:30 AM" type="text" />
          <BaseInput label="End date" placeholder="Mon, Jul 4 22, 6:30 PM" type="text" />
        </div>
        <div class="flex space-x-2">
          <button
            class="flex-1 text-gray-500 font-semibold text-left flex items-center py-2 px-4 rounded-xl hover:bg-gray-100"
            :class="{ 'bg-gray-100': isFixedAmount }" @click="isFixedAmount = true">
            <CheckIcon class="w-5 h-5 mr-1" :class="{ 'opacity-20': !isFixedAmount }" />
            Fixed amount
          </button>
          <button
            class="flex-1 text-gray-500 font-semibold text-left flex items-center py-2 px-4 rounded-xl hover:bg-gray-100"
            :class="{ 'bg-gray-100': !isFixedAmount }" @click="isFixedAmount = false">
            <CheckIcon class="w-5 h-5 mr-1" :class="{ 'opacity-20': isFixedAmount }" />
            Range
          </button>
        </div>
        <div class="text-gray-400 text-lg leading-6 px-2 pb-2 flex items-center">
          <InformationCircleIcon class="w-10 h-10 flex-none text-gray-200 mr-2" />
          <div v-if="isFixedAmount">Every voter is eligable to claim the same, fixed amount of tokens.</div>
          <div v-else>The voting power defines the amount of tokens within the given range.</div>
        </div>
        <BaseInput v-if="isFixedAmount" type="number" label="Claim amount" v-model="claimAmount.min" />
        <div v-else class="flex space-x-2">
          <BaseInput type="number" label="Min. per claim" min="0" v-model="claimAmount.min" />
          <BaseInput type="number" label="Max. per claim" min="0" v-model="claimAmount.max" />
        </div>
        <BaseInput type="number" label="Total amount of tokens" v-model="depositAmount" />
        <div v-if="remainingAmount < 0" class="bg-amber-50 text-amber-900 rounded-xl p-3 font-medium">
          You need to deposit <strong>{{ Math.abs(remainingAmount) }} more tokens</strong> to cover all
          <strong>{{
            voters.length }} voters</strong>.
          You can also deposit more tokens later but claiming is only possible as long as there are enough tokens
          deposited.
        </div>
        <div v-if="!isFixedAmount" class="text-center flex justify-center items-center space-x-1">
          <div class="text-gray-400 text-lg">median claim amount:</div>
          <div class="text-gray-900 font-bold text-xl">{{ claimAmount.min + 0.3 }} ERC</div>
        </div>
        <button class="btn secondary" @click="downloadClaims">
          <DownloadIcon class="w-5 h-5 inline" />
          Download claim list
        </button>
        <button @click="createBoost" class="btn text-2xl py-6">
          Create new boost
        </button>
      </div>
    </div>
  </Layout>
</template>