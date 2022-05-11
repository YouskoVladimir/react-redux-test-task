import { useLayoutEffect, useRef } from 'react'
import { followCursorHandlerGenerator, respawnCursorHandlerCreator } from './acrylHelpers'

export const useAntiAcrylicCursor = () => {
  const wrapperRef = useRef(null)
  const cursorRef = useRef(null)

  useLayoutEffect(() => {
    const { mousemove, mouseenter, mouseleave, cursorEventRef } = followCursorHandlerGenerator(
      wrapperRef.current,
      cursorRef.current,
    )

    const wrapper = wrapperRef.current

    const respawnCursorHandler = respawnCursorHandlerCreator(cursorRef.current)

    wrapper.addEventListener('mouseenter', respawnCursorHandler)

    wrapper.addEventListener('mouseenter', mouseenter)
    wrapper.addEventListener('mousemove', mousemove)
    wrapper.addEventListener('mouseleave', mouseleave)

    let resizeObserver
    try {
      resizeObserver = new ResizeObserver(() => cursorEventRef.current && mousemove(cursorEventRef.current))
      resizeObserver.observe(wrapperRef.current)
    } catch {
      resizeObserver = null
    }


    return () => {
      wrapper.removeEventListener('mouseenter', respawnCursorHandler)

      wrapper.removeEventListener('mouseenter', mouseenter)
      wrapper.removeEventListener('mousemove', mousemove)
      wrapper.removeEventListener('mouseleave', mouseleave)

      resizeObserver?.disconnect()
    }
  }, [])
  return [wrapperRef, cursorRef]
}
