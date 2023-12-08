<template>
  <div
    id="logo"
    class="w4 flex h-[75px] w-[75px] items-center justify-center rounded-md bg-success"
  >
    <img src="../assets/logo_no_background.svg" class="h-[70%] w-[70%]" />
  </div>
  <span class="mt-4 text-2xl text-lg text-white">WELCOME BACK</span>

  <form class="mt-4 flex w-full flex-col items-center justify-center">
    <BaseTextInput type="text" placeholder="email or username" />
    <BaseTextInput type="password" placeholder="password" />
    <button class="mt-4 h-[44px] w-[333px] rounded-md bg-primary text-xl">SIGN IN</button>
  </form>

  <span class="text-md mt-2 text-white"> <a class="underline">Forgot password</a></span>
  <span class="text-md mt-2 text-white">
    New to BUILDR <a class="font-bold underline">Sign Up</a>
  </span>
</template>

<script>
import { Icon } from '@iconify/vue'
import BaseTextInput from './BaseTextInput.vue'
import { ref } from 'vue'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    return { email, password }
  },
  name: 'LoginModal',
  components: { BaseTextInput }
}
</script>
