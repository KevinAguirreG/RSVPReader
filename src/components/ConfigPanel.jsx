import React from 'react'

export default function ConfigPanel({config, updateConfig}){
  if(!config) config = {}
  return (
    <div className="p-4 bg-gray-800 rounded space-y-4">
      <h2 className="font-semibold mb-1">Config</h2>

      <div>
        <label className="block text-sm text-gray-300">WPM: <span className="font-medium">{config.wpm}</span></label>
        <input className="w-full" type="range" min="100" max="1000" value={config.wpm} onChange={e=>updateConfig({wpm: Number(e.target.value)})} />
      </div>

      <div>
        <label className="block text-sm text-gray-300">Font size: <span className="font-medium">{config.fontSize}px</span></label>
        <input className="w-full" type="range" min="24" max="120" value={config.fontSize} onChange={e=>updateConfig({fontSize: Number(e.target.value)})} />
      </div>

      <div>
        <label className="block text-sm text-gray-300">Accent color</label>
        <input type="color" value={config.accentColor} onChange={e=>updateConfig({accentColor: e.target.value})} className="w-full h-8 p-0 rounded" />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-300">Show context</label>
        <input type="checkbox" checked={config.showContext} onChange={e=>updateConfig({showContext: e.target.checked})} />
      </div>

      <div className="text-xs text-gray-500">Settings are saved to localStorage.</div>
    </div>
  )
}
