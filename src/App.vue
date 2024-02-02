<script>
import MainNav from './components/MainNav.vue'
import LoginModal from './components/LoginModal.vue'
import BaseModal from './components/BaseModal.vue'
import SignupModal from './components/SignupModal.vue'
import { useModalStore } from './store/ModalsStore.js'

export default {
  name: 'App',
  components: { MainNav, LoginModal, BaseModal, SignupModal },
  setup() {
    const modalStore = useModalStore()
    return { modalStore }
  }
}
</script>

<template>
  <main-nav></main-nav>
  <BaseModal v-if="modalStore.active_modal" :background="false">
    <LoginModal v-if="modalStore.active_modal == 'login'" />
    <SignupModal v-if="modalStore.active_modal == 'signup'" />
  </BaseModal>
  <div class="h-full w-full">
    <router-view></router-view>
  </div>
</template>
