<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/outline'

const props = defineProps<{
  items: Record<string, any>,
  listLabel?: string,
}>()

const selectedItem = ref(props.items[0])
</script>

<template>
  <div class="relative">
    <label class="label">Proposal:</label>
    <Listbox v-model="selectedItem" as="div" v-slot="{ open }">
      <ListboxButton class="input">
        <div class="truncate">
          {{ selectedItem.text }}
        </div>
        <ChevronDownIcon class="absolute right-1 top-1 h-6 w-6 text-gray-300 transition-transform"
          :class="{ 'rotate-180': open }" />
      </ListboxButton>
      <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <ListboxOptions class="absolute z-10 bg-gray-800 rounded-xl p-2 space-y-2"
          style="box-shadow: 0 0 12px 0 rgb(0 0 0 / 0.25);">
          <label v-if="listLabel" class="font-semibold text-gray-400 px-3">{{ listLabel }}</label>
          <ListboxOption v-for="item in items" :key="item.id" :value="item" v-slot="{ selected }">
            <div class="rounded-xl px-3 py-2 cursor-pointer" :class="{
  'bg-gray-100 hover:bg-gray-200 text-gray-800': selected,
  'bg-gray-800 hover:bg-gray-900 text-gray-100': !selected
            }">
              <div class="w-56 truncate opacity-40">
                0xe07284156fb063d5fba6b9fed50cc74fad36ea02c2ede0207434db476884104b
              </div>
              <div class="font-bold">{{ item.text }}</div>
            </div>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </Listbox>
  </div>
</template>