import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Container from '../components/Container';
export default function Results(){ const {state} = useLocation(); const navigate = useNavigate(); if(!state) return <div className="text-center py-20">No results</div>;
  const {questions,answers} = state; const score = answers.filter(a=>a && a.selected === a.correct).length;
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <div className="text-center"><div className="text-3xl font-extrabold">{score} <span className="text-slate-400">/ {questions.length}</span></div><div className="mt-2 text-slate-600">Review</div></div>
        <div className="mt-6 space-y-4">
          {questions.map((q,i)=>{ const ans = answers[i]; const ok = ans && ans.selected === q.correct; return (
            <div key={i} className="p-3 border rounded-lg">
              <div className="font-medium" dangerouslySetInnerHTML={{__html:q.question}} />
              <div className="mt-2 text-sm">Your: <span className={ok? 'text-green-600':'text-red-600'}>{ans? ans.selected:'Skipped'}</span></div>
              <div className="text-sm text-slate-500">Correct: <span className="font-semibold">{q.correct}</span></div>
            </div>
          )})}
        </div>
        <div className="mt-6 flex justify-center gap-3"><button onClick={()=>navigate('/')} className="px-4 py-2 rounded-lg border">Home</button><button onClick={()=>navigate('/quiz?difficulty=easy')} className="btn btn-primary px-4 py-2 rounded-lg">Retry</button></div>
      </Card>
    </div>
  )
}