function scrollFrame() {
  let animationFrame = window.requestAnimationFrame(loop)
  let callbackCollection = []
  let lastY = -1

  function Callback(func, breakOnError) {
    this.func = func
    this.breakOnError = breakOnError
  }

  function loop () {
    // Only process loop if we are scrolling
    const y = window.pageYOffset
    if (!(y === lastY || !callbackCollection.length)) {
      lastY = y
      trigger()
    }
    animationFrame = window.requestAnimationFrame(loop)
  }

  function trigger() {
    // Reverse while loop is safer when potentially removing elements from array
    let i=callbackCollection.length
    while(i--) {
      // callback functions are external and could be problematic
      const callback = callbackCollection[i]
      try {
        callback.func()
      } catch (err) {
        if (callback.breakOnError) {
          remove(callback.func)
        } else {
          throw new Error('ScrollFrame: callback error', { cause: err })
        }
      }
    }
  }

  function contains(func) {
    return callbackCollection.length && callbackCollection.reduce((previousValue, callback) => {
      prev || func === callback.func
    }, false)
  }

  function remove(func) {
    let i=callbackCollection.length
    while(i--) {
      if (callbackCollection[i].func === func) {
        callbackCollection.splice(i, 1)
        break
      }
    }
  }

  function addScrollListener(func, breakOnError = false) {
    // Only allow a single instance of a callback function
    if (!contains(func)) {
      // Only allow functions as callbackCollection
      if (typeof func === 'function') {
        callbackCollection.push(new Callback(func, breakOnError))
      }
    }
  }

  function removeScrollListener(func) {
    remove(func)
  }

  return { addScrollListener, removeScrollListener }
}

module.exports = scrollFrame()
