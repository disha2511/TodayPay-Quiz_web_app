import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Progress from '../components/Progress';
import Question from '../components/Question';
import localData from '../data/questions.json';

export default function Quiz(){
  const [questions,setQuestions] = useState([]);
  const [index,setIndex] = useState(0);
  const [selected,setSelected] = useState(null);
  const [answers,setAnswers] = useState([]);
  const [timeLeft,setTimeLeft] = useState(25);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const difficulty = params.get('difficulty') || 'easy';

  useEffect(()=>{
    async function load(){
      setLoading(true); setError('');
      try{
        const res = await fetch(`/api/api.php?amount=20&type=multiple&difficulty=${difficulty}`);
        if(!res.ok) throw new Error('API');
        const data = await res.json();
        if(data.results && data.results.length){
          const formatted = data.results.map(q=>({ question: q.question, correct: q.correct_answer, options: [...q.incorrect_answers, q.correct_answer].sort(()=>Math.random()-0.5) }));
          setQuestions(formatted);
        } else throw new Error('NoData');
      }catch(e){
        setError('Using local questions (offline or rate-limited).');
        const local = localData[difficulty] || localData.easy;
        setQuestions(local.map(q=>({question: q.question, correct: q.correct, options: [...q.options].sort(()=>Math.random()-0.5)})));
      }finally{ setLoading(false) }
    }
    load();
  },[difficulty]);

  useEffect(()=>{
    if(timeLeft<=0){ handleNext(); return; }
    const t = setTimeout(()=> setTimeLeft(s=>s-1),1000);
    return ()=> clearTimeout(t);
  },[timeLeft]);

  if(loading) return <div className="text-center py-20">Loading…</div>;
  if(!questions.length) return <div className="text-center py-20">No questions</div>;

  const q = questions[index];
  function handleNext(){
    if(!selected) return;
    const copy = [...answers]; copy[index] = {selected, correct:q.correct}; setAnswers(copy);
    setSelected(null); setTimeLeft(25);
    if(index+1 < questions.length) setIndex(i=>i+1); else navigate('/results',{state:{questions,answers:copy}});
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div><div className="text-sm text-slate-500">Difficulty: <strong>{difficulty}</strong></div>
          <div className="text-2xl font-bold">Question {index+1} / {questions.length}</div></div>
          <div className="text-xl font-mono text-red-600">{timeLeft}s</div>
        </div>
        <Progress current={index+1} total={questions.length} />
        <div className="mt-4"><Question q={q.question} options={q.options} selected={selected} onSelect={setSelected} /></div>
        {error && <div className="mt-3 text-yellow-700">{error}</div>}
        <div className="mt-6 flex justify-end"><button disabled={!selected} onClick={handleNext} className="btn btn-primary">{index+1===questions.length? 'Finish':'Next'}</button></div>
      </Card>
    </div>
  )
}