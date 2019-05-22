<template>
  <div class="icon-wrapper">
    <div class="icons">
      <svg-icon name="audio" class-name="mytest"></svg-icon>
      <svg-icon name="play" class-name="mytest"></svg-icon>
    </div>
  </div>
</template>
<style lang="less" scoped>
.icons{
  background: #000;
  padding:30px;
}
.mytest{
  fill:#00f;
  width:100px;
  height:100px;
  &+.mytest{
    margin-left:20px;
  }
}
</style>
