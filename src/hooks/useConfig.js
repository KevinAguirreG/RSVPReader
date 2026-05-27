import { useState, useEffect } from 'react'

const DEFAULTS = {
  wpm: 300,
  fontSize: 64,
  fontFamily: 'monospace',
  bgColor: '#0a0a0a',
  textColor: '#ffffff',
  accentColor: '#e63946',
  showContext: false,
  pauseOnPunctuation: true
}

export function useConfig(){
  const [config, setConfig] = useState(() => {
    try{
      const raw = localStorage.getItem('rsvp.config')
      return raw ? JSON.parse(raw) : DEFAULTS
    }catch{
      return DEFAULTS
    }
  })

  useEffect(()=>{
    try{ localStorage.setItem('rsvp.config', JSON.stringify(config)) }catch{}
  }, [config])

  const updateConfig = (patch) => setConfig(c => ({...c, ...patch}))

  return { config, updateConfig }
}
