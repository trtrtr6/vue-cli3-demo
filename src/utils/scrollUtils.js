export default {
  // 返回角度
  getSlideAngle (dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
  },
  // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
  getSlideDirection (startX, startY, endX, endY) {
    const dy = startY - endY
    const dx = endX - startX
    let result = 0

    // 如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result
    }

    const angle = this.getSlideAngle(dx, dy)
    if (angle >= -45 && angle < 45) {
      result = 4
    } else if (angle >= 45 && angle < 135) {
      result = 1
    } else if (angle >= -135 && angle < -45) {
      result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3
    }
    return result
  }
}
