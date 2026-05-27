import React, { useState } from 'react'

export default function VideoExporter({words = [], config = {}, exporter}){
  const [isExporting, setIsExporting] = useState(false)

  const start = async () => {
    setIsExporting(true)
    try{
      await exporter.startExport(words, config)
    }catch(e){
      console.error(e)
    }
    setIsExporting(false)
  }

  const cancel = () => {
    try{ exporter.cancelExport() }catch(e){ console.error(e) }
    setIsExporting(false)
  }

  const progress = exporter.progress ?? 0

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <button disabled={isExporting || words.length===0} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded" onClick={start}>{isExporting? 'Exporting...':'Export video'}</button>
        {isExporting && (
          <button className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded" onClick={cancel}>Cancel</button>
        )}
        <div className="text-sm text-gray-400">{words.length} words</div>
      </div>

      {isExporting && (
        <div className="mt-3 h-2 bg-gray-800 rounded overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400" style={{width: `${progress}%`}} />
        </div>
      )}
    </div>
  )
}
