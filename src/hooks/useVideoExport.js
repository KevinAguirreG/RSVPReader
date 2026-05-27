import { useState, useRef } from 'react'
import { drawFrame } from '../utils/canvasRenderer'

export function useVideoExport(){
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const abortRef = useRef(false)

  const startExport = async (words = [], config = {}) => {
    if(!words || words.length === 0) return
    setIsExporting(true)
    setProgress(0)
    abortRef.current = false

    const width = config.resolution === '1080p' ? 1920 : 1280
    const height = config.resolution === '1080p' ? 1080 : 720

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const stream = canvas.captureStream(30)
    streamRef.current = stream
    const chunks = []

    let recorder
    try{
      recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' })
    }catch(e){
      recorder = new MediaRecorder(stream)
    }

    recorderRef.current = recorder
    recorder.ondataavailable = (e) => { if(e.data && e.data.size) chunks.push(e.data) }

    const delayFor = (token) => {
      const base = 60000 / (config.wpm || 300)
      const mult = token?.pauseMultiplier || 1
      return base * mult
    }

    const draw = (token) => drawFrame(canvas, token, config)

    const wait = (ms) => new Promise(r => setTimeout(r, ms))

    const stopRecorder = () => {
      try{ if(recorder && recorder.state !== 'inactive') recorder.stop() }catch(e){}
      try{ if(streamRef.current){ streamRef.current.getTracks().forEach(t=>t.stop()); streamRef.current = null } }catch(e){}
    }

    recorder.start()

    for(let i=0;i<words.length;i++){
      if(abortRef.current) break
      const token = words[i]
      draw(token)
      setProgress(Math.round((i / Math.max(1, words.length-1)) * 100))
      await wait(delayFor(token))
    }

    stopRecorder()

    // wait for recorder to finalize
    const blob = await new Promise(resolve => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }))
    })

    if(abortRef.current){
      setIsExporting(false)
      setProgress(0)
      return
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rsvp-export.webm'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)

    setIsExporting(false)
    setProgress(100)
  }

  const cancelExport = () => {
    abortRef.current = true
    try{ if(recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop() }catch(e){}
    try{ if(streamRef.current){ streamRef.current.getTracks().forEach(t=>t.stop()); streamRef.current = null } }catch(e){}
    setIsExporting(false)
    setProgress(0)
  }

  return { startExport, cancelExport, isExporting, progress }
}
