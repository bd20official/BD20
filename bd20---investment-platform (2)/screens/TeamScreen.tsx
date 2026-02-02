
import React, { useState } from 'react';
import { ArrowLeft, Copy, UserPlus, Users, TrendingUp } from 'lucide-react';
import { Screen, Language, User } from '../types';

interface TeamScreenProps {
  setScreen: (s: Screen) => void;
  lang: Language;
  user: User;
}

const TeamScreen: React.FC<TeamScreenProps> = ({ setScreen, lang, user }) => {
  const [level, setLevel] = useState(1);

  // In a real app, these would come from the database
  // For new users, we set them to 0 as requested
  const teamStats = {
    totalMembers: 0,
    totalBonus: 0
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="p-4 flex items-center gap-4 bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={() => setScreen('home')} className="p-2 -ml-2 rounded-full active:bg-slate-100 transition-all">
          <ArrowLeft size={24} className="text-slate-800" />
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">{lang === Language.BN ? 'টিম রিপোর্ট' : 'Team Report'}</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Referral Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <Users className="text-green-600" size={24} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">টিম মেম্বার</p>
            <p className="text-2xl font-black text-slate-800">{teamStats.totalMembers}</p>
          </div>
          <div className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">টিম ইনকাম</p>
            <p className="text-2xl font-black text-slate-800">{teamStats.totalBonus.toFixed(2)} TK</p>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100">
          <div className="flex bg-slate-50/50 p-1.5 border-b border-slate-100">
            {[1, 2, 3].map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 py-4 text-xs font-black rounded-[24px] transition-all uppercase tracking-widest ${level === l ? 'text-green-700 bg-white shadow-sm' : 'text-slate-400'}`}
              >
                Level {l}
              </button>
            ))}
          </div>

          <div className="p-12 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
                <Users size={40} className="text-slate-200" />
             </div>
             <p className="text-sm font-black text-slate-800 uppercase tracking-tight">লেভেল {level} এ কেউ নেই</p>
             <p className="text-xs text-slate-400 font-medium mt-2 max-w-[200px]">বন্ধুদের আমন্ত্রণ জানান এবং আপনার টিম তৈরি করুন।</p>
          </div>
        </div>

        {/* Invite Widget */}
        <div className="gradient-primary rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
           <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <UserPlus size={28} />
             </div>
             <div>
                <h3 className="text-xl font-black tracking-tight leading-none mb-1">টিম বাড়ান</h3>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">রেফার করে আয় করুন</p>
             </div>
           </div>
           
           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 flex items-center justify-between border border-white/20">
              <div>
                <p className="text-[9px] text-white/50 font-black uppercase tracking-widest mb-1">আপনার কোড</p>
                <span className="text-2xl font-black tracking-[0.3em] uppercase">{user.referCode}</span>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(user.referCode);
                  alert('Code Copied!');
                }} 
                className="p-4 bg-white text-green-700 rounded-2xl shadow-xl active:scale-90 transition-all"
              >
                 <Copy size={20} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeamScreen;
