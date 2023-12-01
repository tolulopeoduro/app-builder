<template>
  <div class="fixed flex h-10 w-full flex-row items-center justify-between bg-gray-1 px-4">
    <main-nav-logo />

    <div class="flex w-auto flex-row items-center justify-between">
      <a href="/" class="text-light-gray hover:text-light text-md mr-4 font-sans font-light"
        >BUILT WITH BUILDR</a
      >
      <a href="/" class="text-light-gray hover:text-light text-md mr-4 font-sans font-light"
        >CONTRIBUTE ON GITHUB</a
      >
      <SearchBar placeholder="Search" />
      <RectangleButton text="BUILD" class="!bg-primary mr-3" />
      <RectangleButton text="SIGN IN" />
    </div>
  </div>
</template>

<script>
import MainNavLogo from './MainNavLogo.vue'
import RectangleButton from './RectangleButton.vue'
import SearchBar from './SearchBar.vue'

export default {
  name: 'App',
  components: { MainNavLogo, RectangleButton, SearchBar },
  setup() {}
}
</script>
