const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

const originalWindow = { ...window }
const windowSpy = jest.spyOn(global, 'window', 'get')
const { addScrollListener, removeScrollListener } = require('./index');
const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))

describe('When addScrollListener adds a callback (y-scroll)', () => {
  const mockCallback = jest.fn()

  beforeAll(() => {
    addScrollListener(mockCallback)
  })

  it('it should fire on vertical scroll', async () => {
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      pageYOffset: -40
    }))
    await waitRAF();
    expect(mockCallback).toHaveBeenCalled()
  })

  it('it shouldn\'t fire twice for a single vertical scroll', async () => {
    await waitRAF();
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('it should fire on subsequent vertical scrolls', async () => {
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      pageYOffset: 0
    }))
    await waitRAF();
    expect(mockCallback).toHaveBeenCalledTimes(2)
  })

  afterAll(() => {
    removeScrollListener(mockCallback)
    jest.clearAllMocks();
  })
})

describe('When addScrollListener adds a callback (x-scroll)', () => {
  const mockCallback = jest.fn()

  beforeAll(() => {
    addScrollListener(mockCallback)
  })

  it('it should fire on horizontal scroll', async () => {
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      pageXOffset: -40
    }))
    await waitRAF();
    expect(mockCallback).toHaveBeenCalled()
  })

  it('it shouldn\'t fire twice for a single horizontal scroll', async () => {
    await waitRAF();
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('it should fire on subsequent horizontal scrolls', async () => {
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      pageXOffset: 0
    }))
    await waitRAF();
    expect(mockCallback).toHaveBeenCalledTimes(2)
  })

  afterAll(() => {
    removeScrollListener(mockCallback)
    jest.clearAllMocks();
  })
})

describe('When removeScrollListener removes a callback', () => {
  const mockCallback = jest.fn()

  beforeAll(() => {
    addScrollListener(mockCallback)
    removeScrollListener(mockCallback)
  })

  it('it shouldn\'t fire on scroll', async () => {
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      pageYOffset: -40
    }))
    await waitRAF();
    expect(mockCallback).toHaveBeenCalledTimes(0)
  })

  afterAll(() => {
    jest.clearAllMocks();
  })
})
