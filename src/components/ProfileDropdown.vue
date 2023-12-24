<template>
  <div
    class="absolute bottom-[-60px] justify-start rounded-sm bg-gray-1 font-sans font-light text-white shadow-md shadow-black"
  >
    <RectangleButton
      text="SIGN IN"
      class="!bg-gray-1 text-white"
      icon="material-symbols-light:login-sharp"
      :handleClick="() => go_to('login')"
    />
    <RectangleButton
      text="SIGN UP"
      class="!bg-gray-1 text-white"
      icon="ri:user-add-line"
      :handleClick="() => go_to('signup')"
    />
  </div>
</template>

<script setup>
import RectangleButton from './RectangleButton.vue'
import { useModalStore } from '../store/ModalsStore'
const modalStore = useModalStore()
const go_to = (destination) => {
  modalStore.active_modal = destination
}
</script>
