const trim = (string) => {
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
