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
      transformOrigin: null,
      clickPosition: null
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
  created () {
    document.documentElement.addEventListener('click', (e) => {
      this.clickPosition = `${e.pageX}px ${e.pageY}px`
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => (this.clickPosition = null), 100)
    })
  },
  mounted () {
  },
  methods: {
    open () {
      // 可以实现自动获取了，暂时注释掉，后期在观察全局自动获取是否可靠
      // if (this.event) {
      // this.transformOrigin = `${this.event.pageX}px ${this.event.pageY}px`
      // }
      this.transformOrigin = this.clickPosition
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
        setTimeout(() => (this.open()), 0)
      } else {
        this.close()
      }
    }
  }
}
