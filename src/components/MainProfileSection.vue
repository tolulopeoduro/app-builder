<script setup>
import Container from './Container.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Container class="mt-16 flex h-48 flex-row items-center justify-start rounded-xl bg-gray-1 px-4">
    <div class="w-50 flex h-40 w-[50%] flex-row items-start justify-start">
      <div class="h-40 w-40 rounded-lg bg-black"></div>
      <div class="ml-4 flex flex-col items-start justify-start">
        <h1 class="text-4xl font-bold">Username</h1>
        <div class="flex flex-row items-center justify-start text-sm">
          <Icon icon="material-symbols:mail" />
          <span class="ml-2">emailaddress@provider.com</span>
        </div>
        <div class="flex flex-row items-center justify-start text-sm">
          <Icon icon="healthicons:phone-negative" />
          <span class="ml-2 text-light-gray">Add phone number</span>
        </div>
      </div>
    </div>
  </Container>
</template>
