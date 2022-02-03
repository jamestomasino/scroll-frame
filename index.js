function scrollFrame() {
  let animationFrame = window.requestAnimationFrame(loop)
  let callbacks = []
  let lastY = -1

  function loop () {
    // Only process loop if we are scrolling
    const y = window.pageYOffset
    if (y === lastY || !callbacks.length) {
      animationFrame = window.requestAnimationFrame(loop)
      return
    }
    lastY = y

    // Avoid 'forEach' for browser support
    for (let i = 0; i < callbacks.length; ++i) {
      // Callbacks are external and could be problematic
      try {
        callbacks[i]()
      } catch (err) {
        throw new Error('ScrollFrame: callback error', { cause: err })
      }
    }
    animationFrame = window.requestAnimationFrame(loop)
  }

  function addScrollListener(callback) {
    // Only allow a single instance of a callback
    if (callbacks.indexOf(callback) === -1) {
      // Only allow functions as callbacks
      if (typeof callback === 'function') {
        callbacks.push(callback)
      }
    }
  }

  function removeScrollListener(callback) {
    // Avoid 'includes' for browser support
    if (callbacks.indexOf(callback) !== -1) {
      callbacks.splice(callbacks.indexOf(callback), 1);
    }
  }

  return { addScrollListener, removeScrollListener }
}

module.exports = scrollFrame()
