<template>
  <button
    class="flex h-6 w-24 flex-row items-center justify-center rounded-md bg-white"
    @click="
      () => {
        handleClick()
      }
    "
  >
    <Icon v-if="loading" icon="line-md:loading-twotone-loop" />
    <Icon v-if="icon && !loading" :icon="icon" class="mr-1" />
    <span v-if="!loading">
      {{ text }}
    </span>
  </button>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'RectangleButton',
  props: ['text', 'icon', 'handleClick', 'loading'],
  components: { Icon }
}
</script>
