import { addClass } from '@/utils/dom'
const instances = {}
const PopupManager = {
  modalDom: undefined,
  modalStack: [],
  zIndex: 2019,
  getModal: function () {
    if (!PopupManager.modalDom) {
      PopupManager.modalDom = document.createElement('div')
    }
    // PopupManager.modalDom.addEventListener('click', () => {
    //   PopupManager.doOnModalClick && PopupManager.doOnModalClick()
    // })
    return PopupManager.modalDom
  },
  getInstance: function (id) {
    return instances[id]
  },
  register: function (id, instance) {
    if (id && instance) {
      instances[id] = instance
    }
  },
  deregister: function (id) {
    if (id) {
      instances[id] = null
      delete instances[id]
    }
  },
  nextZIndex: function () {
    return PopupManager.zIndex++
  },
  openModal: function (id, zIndex, dom) {
    const modalDom = PopupManager.getModal()
    addClass(modalDom, 'x-modal')
    addClass(modalDom, 'x-modal-enter')
    modalDom.style.zIndex = zIndex
    document.body.appendChild(modalDom)
    this.modalStack.push({ id, zIndex })
  },
  closeModal: function (id) {
    const modalStack = this.modalStack
    const topItem = modalStack[modalStack.length - 1]
    if (topItem.id === id) {
      modalStack.pop()
    }
    const modalDom = PopupManager.getModal()
    addClass(modalDom, 'x-modal-leave')
    setTimeout(() => {
      if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
      PopupManager.modalDom = undefined
    }, 200)
  }
  // doOnModalClick: function () {
  //   const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1]
  //   if (!topItem) return
  //   const instance = PopupManager.getInstance(topItem.id)
  //   if (instance) {
  //     instance.close()
  //   }
  // }
}

export default PopupManager
