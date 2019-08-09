export default {
  props: {
    maskClosable: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    show () {
      this.isVisible = true
      this.$emit('update:visible', this.isVisible)
    },
    hide () {
      this.isVisible = false
      this.$emit('update:visible', this.isVisible)
    },
    maskClick (e) {
      this.$emit('maskClick', e)
      if (this.maskClosable) {
        this.hide()
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val) {
          this.show()
        } else {
          this.hide()
        }
      }
    }
  }
}
