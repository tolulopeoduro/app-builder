<script></script>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  placeholder: String,
  type: String,
  modelValue: String,
  errors: {
    type: Object
  },
  apiError: {
    type: Object
  }
})

const error = computed(() => {
  return props.errors?.find((e) => e.$property == props.name) || {}
})

watch(error, () => {
  console.log(error.value)
})

const show_password = ref(false)
const togglePassword = () => {
  show_password.value = show_password.value ? false : true
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      :class="`mt-2 flex h-[44px] w-[333px] flex-row items-center rounded-md bg-light-gray-2 px-2 focus-within:bg-white hover:bg-white 
			${(error?.$message || apiError?.source === name) && 'border-2 border-solid border-danger'}`"
    >
      <input
        v-if="type == 'password'"
        class="h-full w-full bg-transparent outline-none"
        :type="show_password ? 'text' : 'password'"
        :placeholder="placeholder"
        @input="(e) => $emit('update:modelValue', e.target.value)"
      />
      <input
        v-else
        class="h-full w-full bg-transparent outline-none"
        type="type"
        :placeholder="placeholder"
        @input="(e) => $emit('update:modelValue', e.target.value)"
      />
      <div v-show="type == 'password'" class="items-center justify-center">
        <Icon
          @click="togglePassword"
          v-if="!show_password"
          icon="mdi:eye-off-outline"
          class="h-6 w-6"
        />
        <Icon @click="togglePassword" v-else icon="mdi:eye-outline" class="h-6 w-6" />
      </div>
    </div>
    <span
      v-if="error?.$message || apiError?.source === name"
      class="drop-shadow-danger mt-1 text-sm text-danger drop-shadow-sm"
      >{{ error?.$message || apiError?.issue }}</span
    >
  </div>
</template>
