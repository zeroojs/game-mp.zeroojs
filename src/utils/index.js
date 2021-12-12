export const delay = (function() {
  let timer = 0
  return function(cb, ms) {
    clearTimeout(timer)
    timer = setTimeout(cb, ms)
  }
})()