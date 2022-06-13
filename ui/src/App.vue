<script setup lang="ts">
import BaseModal from './components/elements/BaseModal.vue'
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
  <BaseModal />
</template>
