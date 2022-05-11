export const progressedInterval = (cb, timeout, cooldown = 100) => {
  let progress = 0
  const frameProgress = cooldown / timeout
  const interval = setInterval(() => {
    const res = cb(progress > 1 ? 1 : progress, frameProgress)
    if (progress >= 1 || res === true) clearInterval(interval)
    progress += frameProgress
  }, cooldown)
  return interval
}

export const moveToCursorEventHandlerGenerator =
  (parent, cursor, cursorEventRef = {}) =>
    e => {
      cursorEventRef.current = e
      const rect = parent.getBoundingClientRect()
      cursor.style.left = e.clientX - rect.left - cursor.offsetWidth / 2 + 'px'
      cursor.style.top = e.clientY - rect.top - cursor.offsetHeight / 2 + 'px'
    }

export const fadeInCursor = cursor =>
  progressedInterval((_, frameProgress) => {
    const curOpacity = +cursor.style.opacity
    cursor.style.opacity = (curOpacity >= 0 ? curOpacity : 0) + frameProgress
    if (cursor.style.opacity >= 1) {
      cursor.style.opacity = 1
      return true
    }
  }, 1000)

export const fadeOutCursor = (cursor, shouldDestroy = false) =>
  progressedInterval((_, frameProgress) => {
    const curOpacity = +cursor.style.opacity
    cursor.style.opacity = (curOpacity <= 1 ? curOpacity : 1) - frameProgress
    if (cursor.style.opacity <= 0) {
      cursor.style.opacity = 0
      if (shouldDestroy) setTimeout(() => cursor.remove())
      return true
    }
  }, 1000)

export const respawnCursorHandlerCreator = cursor => () => {
  if (!cursor || cursor.style.opacity === 0) return
  const oldCursorStub = cursor.cloneNode()
  cursor.parentNode.insertBefore(oldCursorStub, cursor)
  cursor.style.opacity = 0
  fadeOutCursor(oldCursorStub, true)
}

export const followCursorHandlerGenerator = (parent, cursor) => {
  let fadeInInterval = null
  let fadeOutInterval = null
  const cursorEventRef = { current: null }

  const mousemove = moveToCursorEventHandlerGenerator(parent, cursor, cursorEventRef)

  return {
    mousemove,
    mouseenter: e => {
      cursorEventRef.current = e
      if (fadeOutInterval !== null) {
        clearInterval(fadeOutInterval)
        fadeOutInterval = null
      }
      mousemove(e)
      fadeInInterval = fadeInCursor(cursor)
    },
    mouseleave: e => {
      cursorEventRef.current = e
      if (fadeInInterval !== null) {
        clearInterval(fadeInInterval)
        fadeInInterval = null
      }
      fadeOutInterval = fadeOutCursor(cursor)
    },
    cursorEventRef,
  }
}
