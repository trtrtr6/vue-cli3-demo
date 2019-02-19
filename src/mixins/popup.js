import PopupManager from '@/utils/popupManager'
let popid = 1
export default{
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    event: {
      type: MouseEvent,
      default: undefined
    }
  },
  data () {
    return {
      selfVisible: false,
      transformOrigin: '10% 10%'
    }
  },
  beforeMount () {
    this._popupId = `popup-${popid++}`
    PopupManager.register(this._popupId, this)
  },
  beforeDestroy () {
    PopupManager.deregister(this._popupId)
    PopupManager.closeModal(this._popupId)
  },
  mounted () {
    // 暂时没有什么比较好的方式去实现自动获取，后期完善
    // document.documentElement.addEventListener('click', (e) => {
    //   console.log(e)
    //   console.log(this.transformOrigin)
    //   this.transformOrigin = `${e.pageX} ${e.pageY}`
    //   // mousePosition = {
    //   //   x: e.pageX,
    //   //   y: e.pageY,
    //   // };
    //   // 100ms 内发生过点击事件，则从点击位置动画展示
    //   // 否则直接 zoom 展示
    //   // 这样可以兼容非点击方式展开
    // })
  },
  methods: {
    open () {
      if (this.event) {
        this.transformOrigin = `${this.event.pageX}px ${this.event.pageY}px`
      }
      this.selfVisible = true
      this.doOpen()
    },
    doOpen () {
      const dom = this.$el
      // 打开遮罩层
      PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom)
      // 设置弹窗主题的z-index层级
      dom.style.zIndex = PopupManager.nextZIndex()
    },
    close () {
      this.selfVisible = false
      this.doClose()
    },
    doClose () {
      PopupManager.closeModal(this._popupId)
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.open()
      } else {
        this.close()
      }
    }
  }
}
