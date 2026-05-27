export function drawFrame(canvas, token, config){
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  ctx.fillStyle = config.bgColor || '#0a0a0a'
  ctx.fillRect(0,0,width,height)

  const fontSize = config.fontSize || 64
  ctx.font = `${fontSize}px ${config.fontFamily || 'monospace'}`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  const x = width/2
  const y = height/2
  const word = token.word || ''
  // Simple ORP highlight: draw full word in textColor, then overlay ORP char in accentColor
  ctx.fillStyle = config.textColor || '#fff'
  ctx.fillText(word, x, y)

  const orp = token.orpIndex || 0
  const before = word.slice(0, orp)
  const orpChar = word[orp] || ''
  // measure width of before to position ORP marker
  const beforeWidth = ctx.measureText(before).width
  const totalWidth = ctx.measureText(word).width
  const startX = x - totalWidth/2
  const orpX = startX + beforeWidth + ctx.measureText(orpChar).width/2

  ctx.fillStyle = config.accentColor || '#e63946'
  ctx.fillText(orpChar, orpX, y)

  // guide line
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(orpX, y + fontSize/2 + 4)
  ctx.lineTo(orpX, y + fontSize/2 + 18)
  ctx.stroke()
}
