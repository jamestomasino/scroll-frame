# Scroll Frame

Better scroll event management using requestAnimationFrame.

## Install

```bash
npm install @jamestomasino/scroll-frame
```

## Use

```js
const { addScrollListener, removeScrollListener } = require('@jamestomasino/scroll-frame');


function onMove() {
  console.log('moving')
}

addScrollListener(onMove) // onMove will be called upon scroll

removeScrollListener(onMove) // onMove will no longer be called upon scroll
```

## Details

`scroll-frame` sets up one master requestAnimationFrame loop which processes callbacks only while the browser window is scrolling. Any deviation in page `window.pageYOffset` will trigger the callbacks to fire. When the window stops scrolling the callbacks stop firing. Multiple callbacks can be added to this scroll listener behavior.

## License

[AGPL-3.0 or later](LICENSE)
