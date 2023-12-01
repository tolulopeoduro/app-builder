<script>
import { onMounted, ref, watch, watchEffect } from 'vue'
export default {
  name: 'LandingPage',
  setup() {
    const gradient = ref('radial-gradient(circle at center)')
    const updateGradient = () => {
      const box = document.getElementById('boxes').getBoundingClientRect()
      const { top, left, height, width } = box
      gradient.value = `radial-gradient(circle at ${left + width * 0.67}px ${
        top + height * 0.65
      }px, rgba(149, 227, 101, 0.94) 0%, rgba(149, 227, 101, 0.53) 0.01%, rgba(149, 227, 101, 0.30) 3%, rgba(40, 40, 40, 0.00) 60%)`
    }
    onMounted(() => {
      updateGradient()
      window.addEventListener('resize', () => {
        updateGradient()
      })
    })
    return { gradient, updateGradient }
  }
}
</script>

<template>
  <div
    @load="this.updateGradient"
    id="hero"
    class="flex h-full w-full flex-row items-center justify-around bg-dark text-white"
    :style="{
      backgroundImage: this.gradient
    }"
  >
    <img src="../assets/boxes.svg" alt="boxes" id="boxes" class="h-[600px] w-[600px]" ref="boxes" />
    <span data-testid="hero-text" class="text-right font-sans text-7xl text-white">
      <span
        >Get the Idea<br />
        for your <br />
        web App <br />
        with <br />
      </span>
      <span>
        <img src="../assets/logo_no_background.svg" class="relative left-2 inline h-14 w-14" />UILDR
      </span>
    </span>
  </div>
</template>

<style scoped></style>
