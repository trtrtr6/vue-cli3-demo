;(function retina () {
  // 安卓高分辨率屏幕处理
  if (navigator.userAgent.toUpperCase().indexOf('IPHONE OS') !== -1) return // IOS会缩放，不处理
  const classNames = []
  const pixelRatio = window.devicePixelRatio || 1
  classNames.push('pixel-ratio-' + Math.floor(pixelRatio))
  if (pixelRatio >= 2) {
    classNames.push('retina')
  }

  const html = document.getElementsByTagName('html')[0]

  classNames.forEach(function (className) {
    html.classList.add(className)
  })
})()
