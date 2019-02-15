import PopupManager from '@/utils/popupManager'
let popid = 1
export default{
  props: {
    visible: {
      type: Boolean,
      default: false
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
  methods: {
    open () {
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
