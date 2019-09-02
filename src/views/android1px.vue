<template>
  <div class="wrapper">
    <h1>安卓专用</h1>
    <div class="ad-box ad-all-border">安卓全</div>
    <div class="ad-box ad-top-border">安卓上</div>
    <div class="ad-box ad-right-border">安卓右</div>
    <div class="ad-box ad-bottom-border">安卓下</div>
    <div class="ad-box ad-left-border">安卓左</div>
    <h1>通用</h1>
    <div class="box co-all-border">全</div>
    <div class="box co-top-border">上</div>
    <div class="box co-right-border">右</div>
    <div class="box co-bottom-border">下</div>
    <div class="box co-left-border">左</div>

  </div>
</template>
<style lang="less" scoped>
.ad-box {
  margin-left: 30px;
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background: #e2dddd;
  &.ad-all-border {
    border: 1px solid #000;
    .ad-border(
      @color:#fe6400,
      @width:10px,
      @style:dashed,
      @el:after,
      @radius: 3px
    );
  }
  &.ad-top-border {
    border-top: 1px solid #000;
    .ad-border-top(@color:#fe6400, @width:10px, @style:dashed);
  }
  &.ad-bottom-border {
    border-bottom: 1px solid #000;
    .ad-border-bottom(@color:#fe6400, @width:1px, @style:dashed);
  }
  &.ad-right-border {
    border-right: 1px solid #000;
    .ad-border-right(@color:#fe6400, @width:10px, @style:solid);
  }
  &.ad-left-border {
    border-left: 1px solid #000;
    .ad-border-left(@color:#fe6400, @width:1px, @style:solid, @el:after);
  }
}
.box {
  margin-left: 30px;
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background: #e2dddd;
  &.co-all-border {
    .co-border(@color:#fe6400, @radius: 0, @el:after);
  }
  &.co-top-border {
    .co-border-top(@color:#fe6400, @width:1px);
  }
  &.co-bottom-border {
    .co-border-bottom(@color:#fe6400, @width:10px, @style:dashed);
  }
  &.co-right-border {
    .co-border-right(@color:#fe6400, @width:10px, @style:dashed);
  }
  &.co-left-border {
    margin-bottom: 30px;
    .co-border-left(@color:#fe6400, @width:1px, @style:dashed, @el:after);
  }
}
</style>
