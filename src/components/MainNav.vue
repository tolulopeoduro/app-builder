<template>
  <div class="fixed flex h-10 w-full flex-row items-center justify-between bg-gray-1 px-4">
    <main-nav-logo />

    <div class="flex w-auto flex-row items-center justify-between">
      <a href="/" class="text-md mr-4 font-sans font-light text-light-gray hover:text-light"
        >BUILT WITH BUILDR</a
      >
      <a href="/" class="text-md mr-4 font-sans font-light text-light-gray hover:text-light"
        >CONTRIBUTE ON GITHUB</a
      >
      <SearchBar placeholder="Search" />
      <div class="relative">
        <RectangleButton
          :handleClick="
            () => {
              toggle_profile_menu()
            }
          "
          text="PROFILE"
          class="mr-3 !bg-gray-1 text-white"
          icon="ph:user-light"
        />
        <ProfileDropdown v-if="show_profile_menu" @closeMenu="() => toggle_profile_menu()" />
      </div>
      <RectangleButton text="BUILD" class="!bg-primary" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import MainNavLogo from './MainNavLogo.vue'
import ProfileDropdown from './ProfileDropdown.vue'
import RectangleButton from './RectangleButton.vue'
import SearchBar from './SearchBar.vue'

export default {
  name: 'App',
  components: { MainNavLogo, RectangleButton, SearchBar, ProfileDropdown },
  setup() {
    const show_profile_menu = ref(false)
    const toggle_profile_menu = () => {
      show_profile_menu.value = show_profile_menu.value ? false : true
    }
    return { show_profile_menu, toggle_profile_menu }
  }
}
</script>
