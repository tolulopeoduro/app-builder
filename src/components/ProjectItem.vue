<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
  project: Object
})
</script>

<template>
  <div
    class="mb-2 flex h-[60px] w-[99%] flex-row items-center justify-between rounded-lg bg-light-gray p-1"
  >
    <div class="flex flex-row">
      <div class="h-[50px] w-[50px] rounded-md bg-black"></div>
      <div class="ml-2 flex h-[50px] flex-col justify-start text-[10px]">
        <span class="mb-1 text-[1.8em] text-gray-1">{{ props.project?.projectName }}</span>
        <span class="text-[1em] text-gray-1">Updated last month</span>
      </div>
    </div>
    <Icon icon="f7:ellipsis-circle-fill" class="self-start text-gray-1" />
  </div>
</template>
