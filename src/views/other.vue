<template>
  <div class="home">
    <el-dropdown :appendToBody="false" trigger="click">
      <el-button type="primary">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" :appendToBody="false">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <svg width="1000" height="500">
      <circle cx="30"  cy="50" r="25" />
      <circle cx="90"  cy="50" r="25" class="red" />
      <circle cx="150" cy="50" r="25" class="fancy" />
      <rect x="150" y="100" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
      <ellipse cx="20" cy="260" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
      <text x="150" y="25">Hello World</text>
      <!-- <rect x="150" y="200" width="100" height="100" fill="#feac5e">
        <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
        <animate attributeName="width" to="500" dur="2s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
      </rect> -->
      <g class="layer" transform="translate(360,300)">
        <circle r="5" cx="0"   cy="105" />
        <circle r="5" cx="90"  cy="90"  />
        <circle r="5" cx="180" cy="60"  />
        <circle r="5" cx="270" cy="0"   />
        <path d="M 0 105 L 90 90 L 180 60 L 270 0" fill="none" stroke-width="3" stroke="red"></path>
        <g class="y axis">
          <line x1="0" y1="0" x2="0" y2="105" style="stroke:rgb(0,0,0);stroke-width:2"/>
          <text x="-40" y="105" dy="5">$10</text>
          <text x="-40" y="0"   dy="5">$80</text>
        </g>
        <g class="x axis" transform="translate(0, 105)">
          <line x1="0" y1="0" x2="270" y2="0" style="stroke:rgb(0,0,0);stroke-width:2"/>
          <text x="-30"   y="20">January 2014</text>
          <text x="240" y="20">April</text>
        </g>
      </g>
      <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
    </svg>
    <mu-card style="width: 100%;">
      <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <mu-button flat>Action 1</mu-button>
        <mu-button flat>Action 2</mu-button>
      </mu-card-actions>
    </mu-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
<style>
.home{
  padding-top: 50px;
}
</style>
