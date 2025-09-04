import React from 'react';
import { Link } from 'react-router-dom';
export default function Topbar(){
  return (
    <header className="backdrop-blur bg-white/60 border-b sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold">NQ</div>
          <div className="text-lg font-bold">NewQuiz</div>
        </Link>
        <nav className="text-sm text-slate-600">
          <Link to="/" className="mr-4 hover:underline">Home</Link>
          <Link to="/quiz" className="hover:underline">Quiz</Link>
        </nav>
      </div>
    </header>
  )
}