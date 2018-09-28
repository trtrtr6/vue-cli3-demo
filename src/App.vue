<template>
  <div id="app">
    <router-link to="/about">About</router-link>
    <router-view/>

    <div class="test">测数据数据就是</div>
  </div>
</template>

<style>
@import "./style/reset.css";
.test{
  display: flex;
}
</style>
