import { computed, reactive, ref } from 'vue'
import CreateBoostCommon from '../components/compositions/CreateBoostCommon.vue'
import CreateBoostMode from '../components/compositions/CreateBoostMode.vue'

const boost = reactive({
  ref: '',
  token: '',
  depositAmount: 10,
  amountPerAccount: 0.1,
  guard: '',
  start: 0,
  end: 0
})

const step = ref<string>('common')

const activeComponent = computed(() => {
  if (step.value === 'common') return CreateBoostCommon
  if (step.value === 'mode') return CreateBoostMode
})

export const createBoost = () => ({ boost, step, activeComponent })