import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero(){
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            EduConnect — Free Tutoring for Every Student
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Connect with volunteer tutors, book sessions, and track your learning — building a more equal future through education.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/register" className="px-5 py-3 bg-white text-indigo-700 rounded-md font-semibold">Get Started</Link>
            <a href="#how-it-works" className="px-5 py-3 border border-white rounded-md">How it works</a>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white/10 p-6 rounded-xl border border-white/20">
            <h3 className="font-semibold">Sample Session</h3>
            <p className="mt-2 text-sm opacity-90">Math tutoring · Grade 8 · 1hr</p>
            <div className="mt-4">
              <div className="h-40 bg-white/5 rounded-md flex items-center justify-center">
                <span className="opacity-80">[Video / Session Preview]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
