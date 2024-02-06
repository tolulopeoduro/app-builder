import router from '../router'

export default (url, closeDropdown) => {
  router.push(url)
  closeDropdown()
}
