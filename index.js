function scrollFrame() {
  let animationFrame = window.requestAnimationFrame(loop)
  let callbackCollection = []
  let lastY = -1

  /**
   * Object that holds a callback function and data about how to handle it
   *
   * @param {function} func The callback function
   * @param {boolean} breakOnError If callback function throws an error, remove from scroll listener
   */
  function Callback(func, breakOnError) {
    this.func = func
    this.breakOnError = breakOnError
  }

  /**
   * Determines if scroll has occurred and callbacks exist to initiate a trigger
   */
  function loop () {
    // Only process loop if we are scrolling
    const y = window.pageYOffset
    if (!(y === lastY || !callbackCollection.length)) {
      lastY = y
      trigger()
    }
    animationFrame = window.requestAnimationFrame(loop)
  }

  /**
   * Fire all callback functions in the callback collection
   */
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

  /**
   * Test if callback collection contains a reference to the supplied callback function
   *
   * @param {function} func The function to test for presence in the collection
   * @return {boolean} true if found, false if not found
   */
  function contains(func) {
    return callbackCollection.length && callbackCollection.reduce((prev, callback) => {
      prev || func === callback.func
    }, false)
  }

  /**
   * Binds a callback function to the scroll listener
   *
   * @param {function} func The callback function to trigger on scroll
   * @param {boolean} breakOnError If callback function throws an error, remove from scroll listener
   */
  function addScrollListener(func, breakOnError = false) {
    // Only allow a single instance of a callback function
    if (!contains(func)) {
      // Only allow functions as callbackCollection
      if (typeof func === 'function') {
        callbackCollection.push(new Callback(func, breakOnError))
      }
    }
  }

  /**
   * Remove a callback function from the scroll listener
   *
   * @param {function} func The callback function to remove from the scroll listener
   */
  function removeScrollListener(func) {
    let i=callbackCollection.length
    while(i--) {
      if (callbackCollection[i].func === func) {
        callbackCollection.splice(i, 1)
        break
      }
    }
  }

  return { addScrollListener, removeScrollListener }
}

module.exports = scrollFrame()
