import { useRef, useState, useEffect } from 'react'

export function useRSVP(words = [], config = {wpm:300}){
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)

  useEffect(()=> {
    return () => { if(timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  useEffect(()=>{
    if(!isPlaying){ if(timerRef.current) clearTimeout(timerRef.current); return }
    const token = words[currentIndex]
    const delay = delayFor(token)
    timerRef.current = setTimeout(()=>{
      setCurrentIndex(i => {
        const next = i+1
        if(next >= words.length){ setIsPlaying(false); return i }
        return next
      })
    }, delay)
    return () => { if(timerRef.current) clearTimeout(timerRef.current) }
  }, [isPlaying, currentIndex, words, config.wpm])

  useEffect(()=>{
    // reset index when words change
    setCurrentIndex(0)
    setIsPlaying(false)
  }, [words])

  const delayFor = (token) => {
    const base = 60000 / (config.wpm || 300)
    const mult = token?.pauseMultiplier || 1
    return base * mult
  }

  const play = () => { if(words.length === 0) return; setIsPlaying(true) }
  const pause = () => { setIsPlaying(false); if(timerRef.current) clearTimeout(timerRef.current) }
  const stop = () => { pause(); setCurrentIndex(0) }
  const seekTo = (i) => { setCurrentIndex(Math.max(0, Math.min(i, words.length-1))) }

  return { currentIndex, isPlaying, play, pause, stop, seekTo, setCurrentIndex }
}
