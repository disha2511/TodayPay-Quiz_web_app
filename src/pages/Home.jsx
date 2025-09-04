import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Home(){
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">A fresh take on quizzes — <span className="text-indigo-600">New UI</span></h1>
          <p className="mt-4 text-slate-600">Beautiful, accessible and ready for demos. Timer, progress and local fallback included.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/quiz?difficulty=easy" className="btn btn-primary">Start Easy</Link>
            <Link to="/quiz?difficulty=medium" className="btn border">Medium</Link>
          </div>
        </div>
        <div>
          <Card>
            <div className="text-center">
              <div className="text-sm text-slate-500">What's inside</div>
              <div className="text-2xl font-bold mt-2">60 questions</div>
              <p className="mt-2 text-slate-600">Three levels, nice animations, local fallback for offline use.</p>
              <div className="mt-4">
                <Link to="/quiz?difficulty=hard" className="btn btn-primary">Try Hard</Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}