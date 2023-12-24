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
    <BaseTextInput
      name="username"
      v-model="data.username"
      type="text"
      placeholder="username"
      :errors="v$.$errors"
      :apiError="apiError"
    />
    <BaseTextInput
      name="email"
      v-model="data.email"
      type="email"
      placeholder="email"
      :errors="v$.$errors"
      :apiError="apiError"
    />
    <BaseTextInput
      name="password"
      v-model="data.password"
      type="password"
      placeholder="password"
      :errors="v$.$errors"
      :apiError="apiError"
    />
    <span
      v-if="apiError?.issue && !apiError?.source"
      class="drop-shadow-danger mt-1 text-sm text-danger drop-shadow-sm"
      >{{ apiError?.issue }}</span
    >
    <RectangleButton
      text="sign up"
      class="mt-4 !h-[44px] !w-[333px] !rounded-md !bg-primary !text-xl uppercase"
      :handleClick="handleSignup"
      :loading="loading"
      type="submit"
      :status="status"
    />
  </form>
  <span class="text-md mt-2 text-white"
    >Already have an account? <a class="font-bold underline">Sign in</a></span
  >
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import BaseTextInput from './BaseTextInput.vue'
import RectangleButton from './RectangleButton.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import axios from 'axios'
import { useModalStore } from '../store/ModalsStore'

const loading = ref(false)
const status = ref('loading')

const handleSignup = async () => {
  v$.value.$validate().then(() => {
    if (v$.value.$errors.length == 0) {
      loading.value = true
      axios
        .post(`${import.meta.env.VITE_API_URL}/users/signup`, data)
        .then((res) => {
          Object.keys(res.data).forEach((key) => {
            localStorage.setItem(key, res.data[key])
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
  })
}

const data = reactive({
  email: '',
  password: ''
})

const apiError = ref({})

const rules = {
  username: { required: helpers.withMessage(() => 'please input username', required) },
  email: { required: helpers.withMessage(() => 'please input email', required), email },
  password: { required: helpers.withMessage(() => 'please input password', required) }
}

const v$ = useVuelidate(rules, data)
// watch(data, async () => {
//   console.log(v$.value.$errors)
// })
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
