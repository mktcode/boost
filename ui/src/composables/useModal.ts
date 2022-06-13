import { ref, shallowRef } from 'vue'

const isOpen = ref(false)
const modalComponent = shallowRef<any>(null)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

export function useModal() {
  return {
    isOpen,
    modalComponent,
    closeModal,
    openModal
  }
}