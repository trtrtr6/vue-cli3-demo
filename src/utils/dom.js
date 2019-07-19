let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export const prefixStyle = style => {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

const trim = string => {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
export const addClass = (el, cls) => {
  if (!el) return
  let curClass = el.className
  const clsArr = (cls || '').split(' ')
  clsArr.forEach(c => {
    if ((' ' + curClass + ' ').indexOf(' ' + c + ' ') < 0) {
      curClass += ' ' + c
    }
  })
  el.className = curClass
}
export const removeClass = (el, cls) => {
  if (!el) return
  let curClass = ' ' + el.className + ' '
  const clsArr = (cls || '').split(' ')
  clsArr.forEach(c => {
    if ((' ' + curClass + ' ').indexOf(' ' + c + ' ') > 0) {
      curClass = curClass.replace(' ' + c + ' ', ' ')
    }
  })
  el.className = trim(curClass)
}

export const getRect = el => {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
