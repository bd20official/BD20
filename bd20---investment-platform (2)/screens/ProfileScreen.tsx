
import React from 'react';
import { 
  Download, Info, History, Package, ShieldCheck, LogOut, 
  ChevronRight, Wallet, ArrowDownCircle, ArrowUpCircle, ListRestart, ShieldAlert
} from 'lucide-react';
import { Screen, Language, User } from '../types';

interface ProfileScreenProps {
  setScreen: (s: Screen) => void;
  onLogout: () => void;
  lang: Language;
  user: User;
  pendingCount?: number;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ setScreen, onLogout, lang, user, pendingCount = 0 }) => {
  const menuItems = [
    { icon: <Info size={20} className="text-green-500" />, label: lang === Language.BN ? 'কোম্পানি প্রোফাইল' : 'Company Profile', action: () => setScreen('company-profile') },
    { icon: <History size={20} className="text-purple-500" />, label: lang === Language.BN ? 'অ্যাকাউন্ট রেকর্ড' : 'Account Record', action: () => setScreen('account-records') },
    { icon: <ListRestart size={20} className="text-pink-500" />, label: lang === Language.BN ? 'উইথড্র রেকর্ড' : 'Withdraw Record', action: () => setScreen('withdraw-history') },
    { icon: <Package size={20} className="text-orange-500" />, label: lang === Language.BN ? 'আমার প্রোডাক্ট' : 'My Product', action: () => setScreen('my-products') },
    { icon: <ShieldCheck size={20} className="text-teal-500" />, label: lang === Language.BN ? 'ব্যাংক ও পাসওয়ার্ড' : 'Bank & Password', action: () => setScreen('bank-password') },
    { icon: <Download size={20} className="text-blue-500" />, label: lang === Language.BN ? 'অ্যাপ ডাউনলোড' : 'App Download', action: () => {} },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="gradient-primary h-64 pt-10 px-6 rounded-b-[48px] shadow-lg relative">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl border-4 border-white/20 flex items-center justify-center shadow-lg overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.phone}`} alt="avatar" />
          </div>
          <div>
            <h2 className="text-white text-xl font-black tracking-tight">{user.phone}</h2>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">
              ID: {user.id}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-2xl flex flex-col gap-5 border border-white">
           <div className="flex justify-between items-center">
             <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{lang === Language.BN ? 'বর্তমান ব্যালেন্স' : 'Current Balance'}</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{(user.balance || 0).toFixed(2)} <span className="text-sm font-bold text-slate-400">TK</span></h3>
             </div>
             <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-inner">
                <Wallet size={24} />
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600"><ArrowDownCircle size={18} /></div>
                 <div>
                    <p className="text-[9px] text-slate-400 font-black uppercase leading-none mb-1">{lang === Language.BN ? 'রিচার্জ' : 'Recharge'}</p>
                    <p className="text-xs font-black text-slate-800">{user.rechargeAmount || 0} TK</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600"><ArrowUpCircle size={18} /></div>
                 <div>
                    <p className="text-[9px] text-slate-400 font-black uppercase leading-none mb-1">{lang === Language.BN ? 'উইথড্র' : 'Withdraw'}</p>
                    <p className="text-xs font-black text-slate-800">{user.withdrawAmount || 0} TK</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="px-6 mt-20 space-y-4">
        {/* Manager Mode - ONLY visible to verified Admin Account (01786516131) */}
        {user.isAdmin && (
          <button 
            onClick={() => setScreen('admin-panel')}
            className="w-full flex items-center justify-between p-5 bg-slate-900 text-white rounded-[28px] shadow-xl shadow-slate-200 active:scale-95 transition-all border border-slate-800 relative"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-orange-500/20 rounded-xl text-orange-400"><ShieldAlert size={22} /></div>
              <div className="text-left">
                 <span className="text-sm font-black uppercase tracking-widest block leading-none mb-1">অ্যাডমিন কন্ট্রোল</span>
                 <span className="text-[9px] text-white/50 font-bold uppercase tracking-widest">রিচার্জ ও উইথড্র ম্যানেজমেন্ট</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
               {pendingCount > 0 && (
                 <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                   {pendingCount} New
                 </span>
               )}
               <ChevronRight size={20} className="text-white/20" />
            </div>
          </button>
        )}

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          {menuItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={item.action} 
              className={`w-full flex items-center justify-between p-5 active:bg-slate-50 transition-all ${idx !== menuItems.length - 1 ? 'border-b border-slate-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 rounded-xl shadow-sm">{item.icon}</div>
                <span className="text-sm font-bold text-slate-700 tracking-tight">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
          ))}
        </div>

        <button 
          onClick={onLogout} 
          className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-black uppercase tracking-widest bg-white border-2 border-red-50 rounded-[28px] active:scale-[0.98] transition-all shadow-sm mt-8"
        >
          <LogOut size={20} />
          {lang === Language.BN ? 'লগআউট করুন' : 'Logout Now'}
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
