<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'

interface Props {
  isOpen?: boolean,
}

withDefaults(defineProps<Props>(), {
  isOpen: true,
})

defineEmits<{
  (e: 'close'): void
}>()
</script>


<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-0 text-center">
          <TransitionChild
            as="div"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black opacity-10" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full h-screen sm:h-auto sm:max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:rounded-2xl sm:border-t sm:border-gray-100"
            >
              <DialogTitle
                as="h3"
                class="font-bold leading-10 text-gray-300"
              >
                <slot name="title" />
              </DialogTitle>
              <slot name="body" />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>