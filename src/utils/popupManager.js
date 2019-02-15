import { addClass } from '@/utils/dom'
const instances = {}
const PopupManager = {
  modalDom: undefined,
  zIndex: 2019,
  getModal: function () {
    if (!PopupManager.modalDom) {
      PopupManager.modalDom = document.createElement('div')
    }
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
    modalDom.style.zIndex = zIndex
    document.body.appendChild(modalDom)
  },
  closeModal: function () {
    const modalDom = PopupManager.getModal()
    if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
    PopupManager.modalDom = undefined
  }
}

export default PopupManager
