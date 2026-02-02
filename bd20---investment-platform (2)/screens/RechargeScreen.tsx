
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Copy, Smartphone } from 'lucide-react';
import { Screen, Language } from '../types';

interface RechargeScreenProps {
  setScreen: (s: Screen) => void;
  lang: Language;
  onRechargeSubmit: (data: { amount: number; utr: string; method: string }) => void;
}

const RechargeScreen: React.FC<RechargeScreenProps> = ({ setScreen, lang, onRechargeSubmit }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [utr, setUtr] = useState('');

  const methods = [
    { id: 'h-bkash', name: 'Pay H bKash', provider: 'bKash' },
    { id: 'h-nagad', name: 'Pay H Nagad', provider: 'Nagad' },
    { id: 'm-bkash', name: 'Pay M bKash', provider: 'bKash' },
    { id: 'm-nagad', name: 'Pay M Nagad', provider: 'Nagad' },
  ];

  const adminNumbers = {
    bKash: '01876206197',
    Nagad: '01980240438'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(lang === Language.BN ? 'নম্বরটি কপি করা হয়েছে!' : 'Number copied!');
  };

  const selectedMethod = methods.find(m => m.id === method);
  const selectedProvider = selectedMethod?.provider;

  const handleSubmit = () => {
    const rechargeAmt = Number(amount);
    if (!rechargeAmt || rechargeAmt <= 0) {
      alert(lang === Language.BN ? 'সঠিক পরিমাণ দিন' : 'Enter valid amount');
      return;
    }
    if (!method || !utr) {
      alert(lang === Language.BN ? 'সব তথ্য পূরণ করুন' : 'Fill all fields');
      return;
    }

    onRechargeSubmit({ amount: rechargeAmt, utr, method: selectedMethod?.name || 'Unknown' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-white z-10 border-b">
        <button onClick={() => setScreen('home')} className="p-2 -ml-2 rounded-full active:bg-slate-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{lang === Language.BN ? 'রিচার্জ করুন' : 'Recharge'}</h1>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">রিচার্জ অ্যামাউন্ট (TK)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">TK</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-2xl font-bold focus:border-green-500 transition-all outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['600', '1200', '3000', '5000', '10000'].map(val => (
              <button 
                key={val} 
                onClick={() => setAmount(val)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${amount === val ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">পেমেন্ট মেথড সিলেক্ট করুন</label>
          <div className="grid grid-cols-2 gap-3">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-sm ${method === m.id ? 'border-green-600 bg-green-50' : 'border-slate-100 bg-white'}`}
              >
                {m.name}
                {method === m.id && <CheckCircle2 size={16} className="text-green-600" />}
              </button>
            ))}
          </div>
        </div>

        {method && (
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">প্রাপক নম্বর ({selectedProvider})</p>
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black tracking-wider">
                      {selectedProvider === 'bKash' ? adminNumbers.bKash : adminNumbers.Nagad}
                   </h3>
                   <button onClick={() => copyToClipboard(selectedProvider === 'bKash' ? adminNumbers.bKash : adminNumbers.Nagad)} className="p-3 bg-white/10 rounded-2xl backdrop-blur transition-all active:scale-90"><Copy size={20} /></button>
                </div>
                <p className="text-[10px] mt-4 text-green-400 font-bold flex items-center gap-1 uppercase"><CheckCircle2 size={12} /> ওপরের নম্বরে সেন্ড মানি করুন</p>
             </div>
          </div>
        )}

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">UTR / Transaction ID</label>
          <input 
            type="text" 
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            placeholder="Enter Trans ID"
            className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono text-lg focus:border-green-500 transition-all outline-none"
          />
        </div>

        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
          <h4 className="text-red-700 font-bold text-sm mb-2">রিচার্জ নির্দেশনা:</h4>
          <ul className="text-xs text-red-600 space-y-1 list-disc pl-4">
            <li>ওপরের নম্বরে সঠিক অ্যামাউন্ট সেন্ড মানি করুন।</li>
            <li>সঠিক UTR / Transaction ID দিতে হবে।</li>
            <li>পেমেন্ট করার পর ট্রানজেকশন আইডি কপি করে এখানে বসান।</li>
          </ul>
        </div>

        <button 
          className="w-full py-4 gradient-primary text-white rounded-full font-bold shadow-lg shadow-green-100 disabled:opacity-50"
          disabled={!method || !utr || !amount}
          onClick={handleSubmit}
        >
          Submit Recharge
        </button>
      </div>
    </div>
  );
};

export default RechargeScreen;
