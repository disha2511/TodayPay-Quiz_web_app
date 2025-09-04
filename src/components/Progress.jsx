export default function Progress({current,total}){
  const pct = Math.round((current/total)*100);
  return (<div className="progress-track"><div style={{width:`${pct}%`}} className="h-2 bg-gradient-to-r from-indigo-500 to-sky-500"></div></div>)
}