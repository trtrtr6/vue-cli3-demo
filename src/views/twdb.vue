<template>
  <div class="container">
    <h1>各种双向绑定实现，父子组件件绑定，实例全部采用render渲染函数（并且包含jsx语法）</h1>
    <div>
      <h1>.sync双向绑定</h1>
      <aa class="abc" :snycTest.sync="test" ></aa>
        {{'外面的值：' + test}}
      <button @click="fn">
        外面改变里面
      </button>
    </div>
    <div>
      <h1>v-model双向绑定方法一</h1>
      <bb class="abc" v-model="test" ></bb>
        {{'外面的值：' + test}}
      <button @click="fn">
        外面改变里面
      </button>
    </div>
    <div>
      <h1>v-model双向绑定方法二</h1>
      <bb class="abc" v-model="test" ></bb>
        {{'外面的值：' + test}}
      <button @click="fn">
        外面改变里面
      </button>
    </div>
  </div>
</template>
<script>
const aa = {
  props: {
    snycTest: ''
  },
  render: function (createElement) {
    return createElement(
      'div',
      [
        createElement('ul',
          [
            createElement('li', `里面的值：${this.snycTest}`),
            createElement('button', {
              on: {
                click: () => {
                  this.fn()
                }
              },
              class: 'btn'
            }, '里面改变外面')
          ])
      ]
    )
  },
  methods: {
    fn () {
      this.$emit('update:snycTest', this.snycTest + 1) // 这儿是关键 update:snycTest 自定义事件会告诉父组件将父组件的 test值改为this.snycTest+1，并传回给子组件。
    }
  }
}
const bb = {
  model: { // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
    prop: 'msg',
    event: 'cc'
  },
  props: {
    msg: ''
  },
  render: function (h) {
    return h(
      'div',
      [
        h('ul',
          [
            h('li', `里面的值：${this.msg}`),
            h('button', {
              on: {
                click: () => {
                  this.fn()
                }
              },
              class: 'btn'
            }, '里面改变外面')
          ])
      ]
    )
  },
  methods: {
    fn () {
      this.$emit('cc', this.msg + 2)
    }
  }
}
const cc = {
  model: { // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
    prop: 'msg',
    event: 'cc'
  },
  props: {
    msg: ''
  },
  render: function (h) { // 组件使用时有v-model属性，value初始传的‘what’ 不会被渲染，而是v-model绑定的test值被渲染，这儿value会被重新赋值为v-model绑定的test的值。
    return (
      <div>
        <ul>
          <li>{'里面的值' + this.msg}</li>
          <button class="btn" onClick={this.fn}>里面改变外面</button>
        </ul>
      </div>
    )
  },
  methods: {
    fn () {
      this.$emit('cc', this.msg + 2)
    }
  }
}
export default {
  data () {
    return {
      test: 0
    }
  },
  components: {
    'aa': aa,
    bb,
    cc
  },
  methods: {
    fn () {
      this.test += 1
    }
  }
}
</script>
<style scoped>
button{
  padding:3px 9px;
  background:#000;
  color:#fff;
  border-radius: 8px;
}
</style>
<style>
button.btn{
  padding:3px 9px;
  color:#000;
  border-radius: 8px;
}
</style>
