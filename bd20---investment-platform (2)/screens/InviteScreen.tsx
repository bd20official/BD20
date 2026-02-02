
import React from 'react';
import { ArrowLeft, Copy, Share2, Award, Zap } from 'lucide-react';
import { Screen, Language, User } from '../types';

interface InviteScreenProps {
  setScreen: (s: Screen) => void;
  lang: Language;
  user: User;
}

const InviteScreen: React.FC<InviteScreenProps> = ({ setScreen, lang, user }) => {
  const inviteLink = `https://bd20foods.com/register?ref=${user.referCode}`;

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    alert(message);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="p-4 flex items-center gap-4 bg-white sticky top-0 z-10 border-b">
        <button onClick={() => setScreen('home')} className="p-2 -ml-2 rounded-full active:bg-slate-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{lang === Language.BN ? 'বন্ধুদের জানান' : 'Invite Friends'}</h1>
      </div>

      <div className="p-6">
        {/* Visual Header */}
        <div className="relative mb-8 text-center">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500/10 blur-3xl rounded-full -z-10"></div>
           <div className="w-24 h-24 bg-gradient-to-tr from-green-600 to-green-400 rounded-3xl rotate-12 mx-auto flex items-center justify-center shadow-2xl">
              <Share2 size={48} className="text-white -rotate-12" />
           </div>
           <h2 className="text-2xl font-black text-slate-800 mt-6 leading-tight">ইনভাইট করুন,<br/>বোনাস জিতুন!</h2>
           <p className="text-slate-400 text-sm mt-2 font-medium">প্রতিটি সফল রেফারে পাবেন নিশ্চিত কমিশন</p>
        </div>

        {/* Link Box */}
        <div className="space-y-4">
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">আপনার ইনভাইট লিংক</p>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                 <p className="text-xs font-mono text-slate-500 truncate flex-1">{inviteLink}</p>
                 <button onClick={() => copyToClipboard(inviteLink, 'Link Copied!')} className="p-2 bg-green-600 text-white rounded-xl shadow-md active:scale-90 transition-all">
                    <Copy size={16} />
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">রেফার কোড</p>
              <div className="flex items-center justify-between">
                 <p className="text-3xl font-black text-slate-800 tracking-[0.2em]">{user.referCode}</p>
                 <button onClick={() => copyToClipboard(user.referCode, 'Code Copied!')} className="px-6 py-2 bg-slate-800 text-white rounded-full text-xs font-bold active:scale-95 transition-all">Copy</button>
              </div>
           </div>
        </div>

        {/* Commission Rules */}
        <div className="mt-8 space-y-4">
           <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <Award className="text-orange-500" size={18} />
              কমিশন হার
           </h4>
           <div className="grid grid-cols-3 gap-3">
              <CommissionCard level="Lvl 1" percent="20%" color="bg-green-500" />
              <CommissionCard level="Lvl 2" percent="3%" color="bg-blue-500" />
              <CommissionCard level="Lvl 3" percent="1%" color="bg-orange-500" />
           </div>
        </div>

        <button className="w-full mt-10 py-4 gradient-primary text-white rounded-full font-bold shadow-xl shadow-green-100 flex items-center justify-center gap-3">
           <Zap size={20} fill="currentColor" />
           শেয়ার করুন বন্ধুদের সাথে
        </button>
      </div>
    </div>
  );
};

const CommissionCard: React.FC<{ level: string; percent: string; color: string }> = ({ level, percent, color }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
     <p className="text-[10px] font-bold text-slate-400 mb-1">{level}</p>
     <p className={`text-xl font-black ${color.replace('bg-', 'text-')}`}>{percent}</p>
  </div>
);

export default InviteScreen;
