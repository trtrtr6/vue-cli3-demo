<template>
  <div class="selection-component" v-outsideHide="cancel">
    <div class="selection-show" :class="{ 'is-removed': nowIndex === -1 }" @click="toggleDrop">
      <span>{{ nowIndex !== -1 ? selections[nowIndex].label : selections[lastIndex].label }}<i class="iconfont icon_dropdown_big" style="margin-left:.12rem;"></i>
      </span>
    </div>
    <transition name="zoomInDown">
      <div class="selection-list" v-show="isDrop">
        <ul>
          <li class="selection-list-item" :class="{ 'is-selected': nowIndex === index }"
          v-for="(item, index) in selections" @click="selection(index)" :key="index">{{ item.label }}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    selections: {
      type: Array,
      default: () => { return [] }
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isDrop: false,
      nowIndex: 0,
      lastIndex: 0
    }
  },
  methods: {
    toggleDrop () {
      this.isDrop = !this.isDrop
      if (this.isDrop) {
        this.$emit('open')
      }
    },
    cancel () {
      if (this.isDrop) {
        this.hide()
        // this.$emit('cancel')
      }
    },
    hide () {
      this.isDrop = false
    },
    selection (index) {
      if (this.nowIndex !== index) {
        this.nowIndex = index
        this.hide()
        this.$emit('change', this.selections[index].value)
      }
    },
    getIndexByValue (val) {
      let i = -1
      this.selections.some((item, index) => {
        if (item.value === val) {
          i = index
          return true
        }
      })
      return i
    }
  },
  created () {
    this.nowIndex = this.getIndexByValue(this.selected)
  },
  mounted () {
    // document.addEventListener('touchstart', (e) => {
    //   if (!this.$el.contains(e.target)) this.isDrop = false
    // })
  },
  watch: {
    selected (val, old) {
      this.lastIndex = this.getIndexByValue(old)
      this.nowIndex = this.getIndexByValue(val)
    }
  },
  directives: {
    outsideHide: {
      bind (el, binding) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el._dropOutside_ = documentHandler
        document.addEventListener('touchstart', documentHandler)
      },
      unbind (el) {
        document.removeEventListener('touchstart', el._dropOutside_)
        delete el._dropOutside_
      }
    }
  }
}
</script>
<style lang="less">
.selection-component{
  position:relative;
  i.iconfont{
    font-size:100%;
  }
  .is-removed{
    color:rgb(102,102,102);
  }
  .selection-list{
    text-align:center;
    width:180px;
    top: 27px;
    left:0px;
    position:absolute;
    padding:3px;
    background:rgb(36,42,64);
    .selection-list-item{
      padding:6px 0;
      color:#ccc;
      &.is-selected{
        color:rgb(102,102,102);
      }
    }
  }
}
.zoomInDown-enter-active {
  animation: zoomInDown .2s ease;
}
.zoomInDown-leave-active {
  animation: zoomInDown .2s ease reverse;
}

@keyframes zoomInDown {
  from {
    opacity: 0;
    transform: scale3d(0.9, 0.9, 0.9) translate3d(0, -10px, 0);
  }
  30%{
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
}
</style>
