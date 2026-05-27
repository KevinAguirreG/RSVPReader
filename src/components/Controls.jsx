import React from 'react'

export default function Controls({play, pause, stop, isPlaying, currentIndex, total, seekTo}){
  const pct = total ? Math.round((currentIndex / Math.max(1, total-1)) * 100) : 0

  const onSeekClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    const idx = Math.floor(pct * total)
    seekTo && seekTo(idx)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded" onClick={play}>Play</button>
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded" onClick={pause}>Pause</button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded" onClick={stop}>Stop</button>
        </div>
        <div className="ml-4 text-sm text-gray-400">{currentIndex + 1} / {total}</div>
      </div>
      <div className="mt-3 h-2 bg-gray-800 rounded overflow-hidden cursor-pointer" onClick={onSeekClick}>
        <div className="h-2 bg-gradient-to-r from-green-500 to-green-300" style={{width: `${pct}%`}} />
      </div>
    </div>
  )
}
