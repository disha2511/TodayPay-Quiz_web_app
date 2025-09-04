import React from 'react';
export default function Question({q, options, selected, onSelect, locked}){
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4" dangerouslySetInnerHTML={{__html: q}}/>
      <div className="grid gap-3">
        {options.map((opt,i)=>{
          const active = selected===opt;
          return (
            <button key={i} onClick={()=>onSelect(opt)} className={`px-4 py-3 rounded-lg text-left border transition ${active? 'bg-indigo-600 text-white':'bg-white hover:shadow-sm'}`} dangerouslySetInnerHTML={{__html: opt}} />
          )
        })}
      </div>
    </div>
  )
}