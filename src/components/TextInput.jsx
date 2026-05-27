import React from 'react'

export default function TextInput({text, setText, words}){
  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if(!file) return
    const content = await file.text()
    setText(content)
  }

  return (
    <section className="mb-6">
      <label className="block mb-2 font-medium">Paste text</label>
      <textarea placeholder="Paste or drop a .txt file here" className="w-full h-40 p-4 rounded bg-gray-800 resize-none scrollbar-thin" value={text} onChange={e=>setText(e.target.value)} />
      <div className="flex items-center gap-3 mt-3 justify-between">
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center px-3 py-2 bg-gray-800 rounded cursor-pointer">
            <input className="hidden" type="file" accept=".txt" onChange={handleFile} />
            <span className="text-sm text-gray-300">Load .txt</span>
          </label>
          <div className="text-sm text-gray-400">Words: <span className="font-medium">{words?.length ?? 0}</span></div>
        </div>
        <div className="text-sm text-gray-500">Tip: press Play to begin</div>
      </div>
    </section>
  )
}
