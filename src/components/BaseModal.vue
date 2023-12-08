<template>
  <Teleport to="#modals">
    <div
      style="backdrop-filter: blur(2px)"
      class="backdrop:blur-2 absolute flex h-full w-full items-center justify-center bg-backdrop"
    >
      <div
        :class="`bg-${
          !background ? ' transparent' : 'gray-1'
        } relative flex h-full w-[450px] flex-col items-center justify-center py-2`"
      >
        <div
          @click="handleClose"
          :class="`absolute right-[-44px] top-[40%] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-${
            background ? 'gray-1' : 'white'
          }`"
        >
          <Icon icon="iconoir:cancel" class="h-6 w-6" color="black" />
        </div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useModalStore } from '../store/ModalsStore'
export default {
  name: 'BaseModal',
  setup() {
    const modalStore = useModalStore()
    const handleClose = () => {
      modalStore.clear_modal()
    }
    const el = ref(document.getElementById('modals'))
    onMounted(() => {
      el.value.style.width = '100vw'
      el.value.style.height = '100vh'
    }),
      onUnmounted(() => {
        el.value.style.height = '0vh'
        el.value.style.width = '0vw'
      })
    return { modalStore, handleClose }
  },
  props: ['background'],
  components: { Icon }
}
</script>
