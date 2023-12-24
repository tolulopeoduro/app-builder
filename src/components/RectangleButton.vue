<template>
  <button
    :disabled="loading"
    v-if="type === 'submit'"
    class="flex h-6 w-24 flex-row items-center justify-center rounded-md bg-white"
    :type="type"
    @click="
      () => {
        handleClick()
      }
    "
  >
    <Transition name="bounce">
      <Icon v-if="loading" icon="line-md:loading-twotone-loop" />
    </Transition>
    <Transition name="bounce">
      <Icon v-if="status == 'failure'" icon="ic:outline-error" class="mr-1" />
    </Transition>
    <Transition name="bounce">
      <Icon v-if="status == 'success'" icon="ep:success-filled" class="mr-1" />
    </Transition>
    <!-- <Transition name="bounce"> -->
    <span v-if="!loading && !status">
      {{ text }}
    </span>
    <!-- </Transition> -->
  </button>
  <button
    v-else
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
import { watch } from 'vue'

export default {
  name: 'RectangleButton',
  props: ['text', 'icon', 'handleClick', 'loading', 'type', 'status'],
  components: { Icon },

  setup() {
    watch('status.value', () => console.log(status.value))
  }
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
  position: absolute;
  opacity: 0.3;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
