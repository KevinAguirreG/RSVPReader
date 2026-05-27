import React, { useState, useEffect } from 'react'
import TextInput from './components/TextInput'
import RSVPPlayer from './components/RSVPPlayer'
import Controls from './components/Controls'
import ConfigPanel from './components/ConfigPanel'
import VideoExporter from './components/VideoExporter'
import { useConfig } from './hooks/useConfig'
import { parseText } from './utils/textParser'
import { useRSVP } from './hooks/useRSVP'
import { useVideoExport } from './hooks/useVideoExport'

export default function App(){
  const { config, updateConfig } = useConfig()
  const [rawText, setRawText] = useState('')
  const [words, setWords] = useState([])

  useEffect(()=>{
    setWords(parseText(rawText))
  }, [rawText])

  const rsvp = useRSVP(words, config)
  const { play, pause, seekTo, isPlaying, currentIndex } = rsvp
  const exporter = useVideoExport()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900/60 to-gray-900/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">RSVP Reader</h1>
          <div className="text-sm text-gray-400">WPM: {config.wpm}</div>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TextInput text={rawText} setText={setRawText} words={words} />
            <div className="bg-gray-900 p-4 rounded-lg shadow-inner">
              <RSVPPlayer words={words} currentIndex={rsvp.currentIndex} config={config} />
              <Controls {...rsvp} total={words.length} currentIndex={rsvp.currentIndex} />
              <VideoExporter words={words} config={config} exporter={exporter} />
            </div>
          </div>
          <aside className="lg:col-span-1">
            <ConfigPanel config={config} updateConfig={updateConfig} />
          </aside>
        </div>
      </main>
    </div>
  )
}

// Keyboard shortcuts are handled in App so they have app-wide scope
// - Space: toggle play/pause
// - ArrowRight: seek forward 1 word
// - ArrowLeft: seek backward 1 word
// Ignore events when typing in input or textarea
useEffect(()=>{
  const onKey = (e)=>{
    const tag = (e.target && e.target.tagName) || ''
    if(tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return

    if(e.code === 'Space'){
      e.preventDefault()
      if(isPlaying) pause(); else play()
    } else if(e.key === 'ArrowRight'){
      e.preventDefault()
      seekTo(Math.min((words?.length || 1)-1, currentIndex + 1))
    } else if(e.key === 'ArrowLeft'){
      e.preventDefault()
      seekTo(Math.max(0, currentIndex - 1))
    }
  }
  window.addEventListener('keydown', onKey)
  return ()=> window.removeEventListener('keydown', onKey)
}, [play, pause, seekTo, isPlaying, currentIndex, words])
