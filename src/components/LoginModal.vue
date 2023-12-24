<template>
  <div
    id="logo"
    class="w4 flex h-[75px] w-[75px] items-center justify-center rounded-md bg-success"
  >
    <img src="../assets/logo_no_background.svg" class="h-[70%] w-[70%]" />
  </div>
  <span class="mt-4 text-2xl text-lg text-white">WELCOME BACK</span>

  <form
    @submit.prevent="handleSignin"
    class="mt-4 flex w-full flex-col items-center justify-center"
  >
    <BaseTextInput
      name="email"
      v-model="data.email"
      type="email"
      placeholder="email or username"
      :errors="v$?.$errors"
      :apiError="apiError"
    />
    <BaseTextInput
      name="password"
      v-model="data.password"
      type="password"
      placeholder="password"
      :errors="v$?.$errors"
      :apiError="apiError"
    />
    <Rectanglebutton
      text="login"
      class="mt-4 !h-[44px] !w-[333px] !rounded-md !bg-primary !text-xl uppercase"
      :handleClick="handleSignup"
      :loading="loading"
      type="submit"
      :status="status"
    />
  </form>

  <span class="text-md mt-2 text-white"> <a class="underline">Forgot password</a></span>
  <span class="text-md mt-2 text-white">
    New to BUILDR <a class="font-bold underline">Sign Up</a>
  </span>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import BaseTextInput from './BaseTextInput.vue'
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import Rectanglebutton from './RectangleButton.vue'
import { useModalStore } from '../store/ModalsStore'
import { useUserStore } from '../store/UserStore'

const data = reactive({
  email: '',
  password: ''
})

const apiError = ref({})
const status = ref(null)
const loading = ref(false)

const handleSignin = async () => {
  loading.value = true
  status.value = null
  axios
    .post(`${import.meta.env.VITE_API_URL}/users/signin`, data)
    .then((res) => {
      Object.keys(res.data).forEach((key) => {
        console.log(res.data.data)
        localStorage.setItem(key, res.data[key])
        useUserStore().update_user(res.data?.data)
      })
      status.value = 'success'
    })
    .catch((err) => {
      if (err.response.data) {
        apiError.value = err.response.data
      }
      status.value = 'failure'
    })
    .finally(() => {
      loading.value = false
    })
}
let to

watch(status, () => {
  if (to) clearTimeout(to)

  to = setTimeout(() => {
    if (status.value === 'failure') {
      status.value = null
    } else if (status.value === 'success') {
      useModalStore().clear_modal()
    }
  }, 2500)
})
</script>
