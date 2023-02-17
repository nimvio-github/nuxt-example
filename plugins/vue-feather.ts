import VueFeather from 'vue-feather'

export default defineNuxtPlugin(({vueApp}) => {
  vueApp.component(VueFeather.name, VueFeather)
})