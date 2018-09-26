export default {
  isNotEmpty (str) {
    return str !== undefined && str !== null && str !== ''
  },
  toPercent (value, fixed) {
    if (value === '' || value === undefined) {
      return ''
    }
    let number = Math.round(value * 10000) / 100
    if (fixed) {
      number = number.toFixed(fixed)
    }
    return number + '%'
  },
  toPoint  (value) {
    if (value === '' || value === undefined) {
      return ''
    }
    return (value.replace('%', '')) / 100
  }
}
