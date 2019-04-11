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
