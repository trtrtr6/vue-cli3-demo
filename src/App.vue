<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    console.log(this.$TestApi.t)
    console.log(this.$TestApi.user)

    this.$worker.run(() => 'this.$worker run 1: Function in other thread').then(() => {
      for (let i = 0; i < 100; i++) {
        console.log('run1', i)
      }
    }).catch(console.error)
    this.$worker.run(() => 'this.$worker run 1: Function in other thread').then(() => {
      for (let i = 0; i < 100; i++) {
        console.log('run2', i)
      }
    }).catch(console.error)
    for (let i = 0; i < 100; i++) {
      console.log('run3', i)
    }
  }
}
</script>
<style>
html,body{
  width:100%;
  height:100%;
}
#app{
  width:100%;
  height:100%;
}
</style>
