import React, { useRef, useEffect, useState } from 'react'

export default function RSVPPlayer({words = [], currentIndex = 0, config = {}}){
  const token = words[currentIndex] || { word: 'Ready to read', orpIndex: 0 }
  const orpRef = useRef(null)
  const containerRef = useRef(null)
  const [lineLeft, setLineLeft] = useState(null)

  useEffect(()=>{
    const el = orpRef.current
    const container = containerRef.current
    if(el && container){
      const elRect = el.getBoundingClientRect()
      const contRect = container.getBoundingClientRect()
      setLineLeft(elRect.left - contRect.left + elRect.width/2)
    }
  }, [token.word, currentIndex])

  const before = token.word.slice(0, token.orpIndex)
  const orp = token.word[token.orpIndex] || ''
  const after = token.word.slice(token.orpIndex+1)

  const fontSize = config?.fontSize || 64

  return (
    <div ref={containerRef} className="w-full h-56 md:h-72 flex items-center justify-center relative">
      <div className="select-none text-center">
        <div className={`fade-word inline-block text-center`} style={{fontSize: fontSize, lineHeight: 1}}>
          <span className="opacity-50 mr-2 hidden sm:inline">{before}</span>
          <span ref={orpRef} style={{color: config?.accentColor || 'var(--rsvp-accent)'}} className="font-semibold">{orp}</span>
          <span className="opacity-50 ml-2 hidden sm:inline">{after}</span>
        </div>
      </div>
      {lineLeft != null && (
        <div className="hidden sm:block" style={{position:'absolute', left: lineLeft, top: '62%', height: 40, width:1, background:'rgba(255,255,255,0.12)'}} />
      )}
    </div>
  )
}
