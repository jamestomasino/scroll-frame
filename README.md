# Scroll Frame [![Node.js Package](https://github.com/jamestomasino/scroll-frame/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/jamestomasino/scroll-frame/actions/workflows/npm-publish.yml)

Better scroll event management using requestAnimationFrame.

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

## Details

`scroll-frame` sets up one master requestAnimationFrame loop which processes callbacks only while the browser window is scrolling. Any deviation in page `window.pageYOffset` will trigger the callbacks to fire. When the window stops scrolling the callbacks stop firing. Multiple callbacks can be added to this scroll listener behavior.

## Required support

- [requestAnimationFrame](https://caniuse.com/requestanimationframe) - ~IE10+
- [pageYOffset](https://caniuse.com/mdn-api_window_pageyoffset) - ~IE9+
- [Array.indexOf](https://caniuse.com/mdn-javascript_builtins_array_indexof) - ~IE9+
- [Array.reduce](https://caniuse.com/mdn-javascript_builtins_array_reduce) - ~IE9+
- [Error API](https://caniuse.com/mdn-api_errorevent) - ~IE10+

## License

[AGPL-3.0 or later](LICENSE)
