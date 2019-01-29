<template>
  <div>
    <h1>vue transition过渡动画测试</h1>
    <button @click="change">随机改变动画包含的内容</button>
    <div style="padding:10px;">
      <transition-group name="test">
        <span v-for="(item) in group" :key="item" style="display:inline-block;width:100px;">{{item}}</span>
      </transition-group>
    </div>

    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="test">
        <el-breadcrumb-item v-for="(item)  in group" :key="item">
          <span>{{item}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div id="list-demo" class="demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">
          {{ item }}
        </span>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      group: [
        '测试一',
        '测试二',
        '测试三'
      ],
      flag: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    change () {
      if (this.flag) {
        this.flag = false
        this.$set(this.group, 1, '测试四')
        this.$set(this.group, 2, '测试五')
      } else {
        this.flag = true
        this.$set(this.group, 1, '测试二')
        this.$set(this.group, 2, '测试三')
      }
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}
</script>
<style scoped>
button{
  padding:3px 9px;
  border-radius:6px;
}
</style>

<style>
.test-enter-active,
.test-leave-active {
  transition: all .5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.test-move {
  transition: all .5s;
}

.test-leave-active {
  position: absolute;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
  transition: all 1s;/*也可以使用*-move设置过渡时间来平滑过渡*/
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
/* .list-move {
  transition: all 1s;
} */
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
