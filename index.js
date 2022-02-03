function scrollFrame() {
  let animationFrame = window.requestAnimationFrame(loop)
  let callbacks = []
  let lastY = -1

  function loop () {
    if (process.browser) {
      const y = window.pageYOffset
      if (y === lastY || !callbacks.length) {
        animationFrame = window.requestAnimationFrame(loop)
        return
      }
      lastY = y
      callbacks.forEach((callback) => {
        callback()
      })
      animationFrame = window.requestAnimationFrame(loop)
    }
  }

  function addScrollListener(callback) {
    if (!callbacks.includes(callback)) {
      callbacks.push(callback)
    }
  }

  function removeScrollListener(callback) {
    if (callbacks.includes(callback)) {
      callbacks.splice(callbacks.indexOf(callback), 1);
    }
  }

  return { addScrollListener, removeScrollListener }
}

module.exports = scrollFrame()
