<template>
  <div class="fixed flex h-10 w-full flex-row items-center justify-between bg-gray-1 px-4">
    <main-nav-logo @click="() => router.push('/')" />

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
          :text="userStore.data?.username || 'PROFILE'"
          class="mr-3 !bg-gray-1 text-white"
          icon="ph:user-light"
        />
        <ProfileDropdown v-if="show_profile_menu" @closeMenu="() => toggle_profile_menu()">
          <template v-slot:userOptions>
            <RectangleButton
              class="!bg-gray-1 text-white"
              :withCustomContent="true"
              @click="() => dropdownNavigate('profile', toggle_profile_menu)"
            >
              <template v-slot:buttonContent>MY PROFILE</template>
            </RectangleButton>
          </template>
        </ProfileDropdown>
      </div>
      <RectangleButton text="BUILD" class="!bg-primary" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainNavLogo from './MainNavLogo.vue'
import ProfileDropdown from './ProfileDropdown.vue'
import RectangleButton from './RectangleButton.vue'
import SearchBar from './SearchBar.vue'
import { useUserStore } from '../store/UserStore'
import router from '../router/index'
import dropdownNavigate from '../utils/dropdownNavigate'

const userStore = useUserStore()

const show_profile_menu = ref(false)
const toggle_profile_menu = () => {
  show_profile_menu.value = show_profile_menu.value ? false : true
}
</script>
