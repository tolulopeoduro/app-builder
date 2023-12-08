import { defineStore } from 'pinia'

export const useModalStore = defineStore('modals', {
  state: () => ({
    active_modal: 'signup'
  }),
  actions: {
    update_modal(value) {
      this.active_modal = value
    },
    clear_modal() {
      this.active_modal = null
    }
  }
})
