
import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Screen, Language, User } from '../types';

interface WithdrawScreenProps {
  setScreen: (s: Screen) => void;
  lang: Language;
  user: User;
  onWithdrawSubmit: (data: { amount: number; method: string; account: string }) => void;
}

const WithdrawScreen: React.FC<WithdrawScreenProps> = ({ setScreen, lang, user, onWithdrawSubmit }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bKash (বিকাশ)');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const withdrawCharge = amount ? Number(amount) * 0.1 : 0;
  const receiveAmount = amount ? Number(amount) - withdrawCharge : 0;

  const handleWithdraw = () => {
    const wAmt = Number(amount);
    if (!wAmt || wAmt < 130) {
      alert(lang === Language.BN ? 'মিনিমাম ১৩০ টাকা উইথড্র করুন।' : 'Minimum withdraw amount is 130 TK.');
      return;
    }
    if (wAmt > user.balance) {
      alert(lang === Language.BN ? 'আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!' : 'Insufficient balance!');
      return;
    }
    if (!account) {
      alert(lang === Language.BN ? 'অ্যাকাউন্ট নম্বর দিন!' : 'Enter account number!');
      return;
    }
    if (password !== user.withdrawPassword && password !== user.password) {
      alert(lang === Language.BN ? 'উইথড্র পাসওয়ার্ড সঠিক নয়!' : 'Incorrect withdraw password!');
      return;
    }

    onWithdrawSubmit({ amount: wAmt, method, account });
  };

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-white z-10 border-b">
        <button onClick={() => setScreen('home')} className="p-2 -ml-2 rounded-full active:bg-slate-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{lang === Language.BN ? 'উইথড্র করুন' : 'Withdraw'}</h1>
      </div>

      <div className="p-6">
        {/* Balance Card */}
        <div className="gradient-primary rounded-[32px] p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">{lang === Language.BN ? 'উত্তোলনযোগ্য ব্যালেন্স' : 'Withdrawal Balance'}</p>
          <h2 className="text-4xl font-black mt-2">{user.balance.toFixed(2)} <span className="text-xs">TK</span></h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">উইথড্র অ্যামাউন্ট (TK)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Min. 130 TK"
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-2xl font-black focus:border-green-500 outline-none transition-all"
            />
            {amount && (
              <div className="flex justify-between px-2 text-[10px] font-bold uppercase tracking-tight">
                <span className="text-slate-400">চার্জ (১০%): <span className="text-red-500">{withdrawCharge.toFixed(2)} TK</span></span>
                <span className="text-slate-400">পাবেন: <span className="text-green-600">{receiveAmount.toFixed(2)} TK</span></span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">পেমেন্ট মেথড</label>
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-slate-700 outline-none focus:border-green-500 transition-all appearance-none"
            >
              <option>bKash (বিকাশ)</option>
              <option>Nagad (নগদ)</option>
              <option>Rocket (রকেট)</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">অ্যাকাউন্ট নম্বর</label>
            <input 
              type="tel" 
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="017xxxxxxxx" 
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-slate-700 outline-none focus:border-green-500 transition-all" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">উইথড্র পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******" 
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-slate-700 outline-none focus:border-green-500 transition-all" 
            />
          </div>

          {/* Rules */}
          <div className="bg-blue-50/50 p-5 rounded-[28px] border border-blue-50 flex gap-4">
             <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><Info size={20} /></div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Withdrawal Rules</p>
                <p className="text-[10px] text-blue-600 font-medium">• Time: 08:00 AM - 05:00 PM</p>
                <p className="text-[10px] text-blue-600 font-medium">• Minimum Withdraw: 130 TK</p>
                <p className="text-[10px] text-blue-600 font-medium">• Service Charge: 10%</p>
             </div>
          </div>

          <button 
            className="w-full py-5 gradient-primary text-white rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-green-100 active:scale-[0.98] transition-all mt-4"
            onClick={handleWithdraw}
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawScreen;
