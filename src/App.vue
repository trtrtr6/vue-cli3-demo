<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created () {
    console.log(this.$TestApi.t)
    console.log(this.$TestApi.user)

    // this.$worker.run(() => 'this.$worker run 1: Function in other thread').then(() => {
    //   for (let i = 0; i < 100; i++) {
    //     console.log('run1', i)
    //   }
    // }).catch(console.error)
    // this.$worker.run(() => 'this.$worker run 1: Function in other thread').then(() => {
    //   for (let i = 0; i < 100; i++) {
    //     console.log('run2', i)
    //   }
    // }).catch(console.error)
    // for (let i = 0; i < 100; i++) {
    //   console.log('run3', i)
    // }
  }
}
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
body {
  font-family: "PingFang SC", Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-size: 14px;
  font-weight: 400;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: #fafafa;
  color: rgba(0, 0, 0, 0.87);
}
.row {
  margin-left: 0;
  margin-right: 0;
}
.col-xs {
  padding-left: 0;
  padding-right: 0;
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
