# Scroll Frame [![Node.js Package](https://github.com/jamestomasino/scroll-frame/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/jamestomasino/scroll-frame/actions/workflows/npm-publish.yml)

Better scroll event management using requestAnimationFrame.

## Overview

`scroll-frame` sets up one master requestAnimationFrame loop which processes callbacks only when the browser window is scrolling. Any deviation in page `window.pageYOffset` or `window.pageXOffset` will trigger the callbacks to fire. When the window stops scrolling the callbacks stop firing. Multiple callbacks can be added to this scroll listener behavior. Callbacks can also be removed from the listener.

## Install

```bash
npm install @jamestomasino/scroll-frame
```

## Use

```js
/**
 * Binds a callback function to the scroll listener
 *
 * @param {function} func The callback function to trigger on scroll
 * @param {boolean} breakOnError If callback function throws an error, remove from scroll listener
 */
function addScrollListener(func, breakOnError = false)

/**
 * Remove a callback function from the scroll listener
 *
 * @param {function} func The callback function to remove from the scroll listener
 */
function removeScrollListener(func)
```

## Example
```js
const { addScrollListener, removeScrollListener } = require('@jamestomasino/scroll-frame');

function onMove() {
  console.log('moving')
}

addScrollListener(onMove) // onMove will be called upon scroll.
removeScrollListener(onMove) // onMove will no longer be called upon scroll
```

## License

[AGPL-3.0 or later](LICENSE)
