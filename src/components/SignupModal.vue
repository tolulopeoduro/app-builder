<template>
  <div
    id="logo"
    class="w4 flex h-[75px] w-[75px] items-center justify-center rounded-md bg-success"
  >
    <img src="../assets/logo_no_background.svg" class="h-[70%] w-[70%]" />
  </div>
  <span class="mt-4 text-2xl text-lg text-white">BUILD WITH BUILDR</span>

  <form
    @submit.prevent="handleSignup"
    class="mt-4 flex w-full flex-col items-center justify-center"
  >
    <BaseTextInput v-model="data.email" type="email" placeholder="email or username" />
    <BaseTextInput v-model="data.password" type="password" placeholder="password" />
    <RectangleButton
      text="sign up"
      class="mt-4 !h-[44px] !w-[333px] !rounded-md !bg-primary !text-xl uppercase"
    />
  </form>
  <span class="text-md mt-2 text-white"
    >Already have an account? <a class="font-bold underline">Sign in</a></span
  >
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import BaseTextInput from './BaseTextInput.vue'
import RectangleButton from './RectangleButton.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const handleSignup = () => {
  console.log(data)
}

const data = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, data)
watch(data, () => {
  console.log(v$.value)
})
</script>
