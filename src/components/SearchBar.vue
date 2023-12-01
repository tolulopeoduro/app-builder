<template>
  <div
    class="hover:border-light hover:text-light focus-within:border-light focus-within:text-light border-light-gray text-light-gray border-px mr-3 flex h-7 w-[300px] flex-row items-center justify-between overflow-hidden rounded-md border-[1px] border-solid px-2"
  >
    <input
      class="placeholder:text-light-gray hover:placeholder:text-light hover:focus:placeholder:text-light w-full bg-gray-1 text-sm outline-none"
      :placeholder="placeholder"
    />
    <Icon icon="ion:search" />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
  components: { Icon },
  props: ['placeholder']
}
</script>
