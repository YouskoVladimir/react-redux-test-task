import { useLayoutEffect, useState } from 'react'
import { useAntiAcrylicCursor } from './acrylHooks'
import './acryl.css'

export const Acryl = ({ children, background, blendColor, className, contentClassName, contentRef }) => {
  const [computedBgImageStyle, setComputedBgImageStyle] = useState({})

  const [wrapperRef, cursorRef] = useAntiAcrylicCursor()

  useLayoutEffect(() => {
    if (background) {
      setComputedBgImageStyle({ background })
      return
    }
    let parent = wrapperRef.current.parentElement
    while (parent && getComputedStyle(parent).backgroundImage === 'none') parent = parent.parentElement

    if (parent) setComputedBgImageStyle({ background: getComputedStyle(parent).background })
  }, [background])

  return (
    <div className={`acrylic ${className ?? ''}`} ref={wrapperRef}>
      <div className="acrylic-layer acrylic--blur" style={computedBgImageStyle} />
      <div
        className="acrylic-layer acrylic--blend"
        style={{
          backgroundColor: blendColor,
        }}
      />
      <div className="acrylic-layer acrylic--noise" />
      <div className="anti-acrylic-cursor" ref={cursorRef} style={computedBgImageStyle}/>
      <div className={`acrylic--content ${contentClassName ?? ''}`} ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
