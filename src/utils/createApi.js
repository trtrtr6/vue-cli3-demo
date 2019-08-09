import createAPIComponent from 'vue-create-api'

export default function createAPI (Vue, Component, events, single) {
  Vue.use(createAPIComponent, { componentPrefix: 'x-' })
  const api = Vue.createAPI(Component, events, single)
  return api
}
