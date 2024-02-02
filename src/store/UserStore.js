import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    data: null
  }),
  actions: {
    update_user(value) {
      this.data = { ...value }
    },
    clear_modal() {
      this.data = null
    }
  }
})
