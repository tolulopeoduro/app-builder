<template>
  <main-nav></main-nav>
  <router-view></router-view>
</template>

<script>
import MainNav from './components/MainNav.vue'
export default {
  name: 'App',
  components: { MainNav }
}
</script>
