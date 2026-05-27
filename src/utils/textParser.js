export function parseText(rawText = ''){
  if(!rawText) return []
  const tokens = rawText.split(/\s+/).filter(Boolean).map(w=>{
    const trimmed = w
    const orpIndex = Math.floor(trimmed.length * 0.3)
    let pauseMultiplier = 1
    if(/[.!?]$/.test(trimmed)) pauseMultiplier = 1.5
    else if(/[,;:]$/.test(trimmed)) pauseMultiplier = 1.2
    return { word: trimmed, orpIndex, pauseMultiplier }
  })
  return tokens
}
