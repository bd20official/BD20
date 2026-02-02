
import React, { useState } from 'react';
import { CreditCard, ArrowUpCircle, Users2, Headset, ChevronRight, Wallet, ShoppingBag, Zap, Star } from 'lucide-react';
import { Screen, Language, User, Product } from '../types';
import { PRODUCTS } from '../constants';

interface HomeScreenProps {
  setScreen: (s: Screen) => void;
  lang: Language;
  user: User;
  onPurchase: (product: Product) => boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setScreen, lang, user, onPurchase }) => {
  const [activeTab, setActiveTab] = useState<'long' | 'vip'>('long');

  const TELEGRAM_LINK = 'https://t.me/bd20foods';

  const text = {
    longTerm: lang === Language.BN ? 'দীর্ঘমেয়াদি আয়' : 'Long-term Income',
    vipTerm: lang === Language.BN ? 'ভিআইপি আয়' : 'VIP Income',
    recharge: lang === Language.BN ? 'রিচার্জ' : 'Recharge',
    withdraw: lang === Language.BN ? 'প্রত্যাহার' : 'Withdraw',
    group: lang === Language.BN ? 'গ্রুপ' : 'Group',
    service: lang === Language.BN ? 'সেবা' : 'Service',
    price: lang === Language.BN ? 'মূল্য' : 'Price',
    daily: lang === Language.BN ? 'দৈনিক' : 'Daily',
    days: lang === Language.BN ? 'দিন' : 'Days',
    total: lang === Language.BN ? 'মোট আয়' : 'Total',
    buyNow: lang === Language.BN ? 'এখনই কিনুন' : 'Buy Now',
  };

  const filteredProducts = PRODUCTS.filter(p => p.type === activeTab);

  const handleBuyClick = (product: Product) => {
    // Attempt purchase
    const success = onPurchase(product);
    if (success) {
      alert(lang === Language.BN ? 'সফলভাবে কেনা হয়েছে!' : 'Purchase successful!');
    } else {
      // Specified Bengali message for insufficient balance
      alert(lang === Language.BN ? 'আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই' : 'Insufficient balance in your account');
      setScreen('recharge');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-40 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white font-bold">BD</div>
          <span className="font-bold text-green-800 tracking-tight uppercase text-sm">BD20 FOODS</span>
        </div>
        
        {/* Balance Quick View */}
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
           <Wallet size={14} className="text-green-600" />
           <span className="text-xs font-black text-green-800">{user.balance.toFixed(2)} TK</span>
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 mt-4">
        <div className="h-44 rounded-3xl gradient-primary shadow-lg p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-5 -top-5 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          <h2 className="text-white font-black text-2xl drop-shadow-sm leading-tight">
            বিনিয়োগ করুন,<br/>উপার্জন করুন নিরাপদে।
          </h2>
          <p className="text-white/80 text-xs mt-2 font-medium">বাংলাদেশের ১ নম্বর নির্ভরযোগ্য প্লাটফর্ম</p>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-4 gap-4 px-4 mt-6">
        <ActionIcon icon={<CreditCard className="text-green-600" />} label={text.recharge} onClick={() => setScreen('recharge')} />
        <ActionIcon icon={<ArrowUpCircle className="text-orange-600" />} label={text.withdraw} onClick={() => setScreen('withdraw')} />
        <ActionIcon icon={<Users2 className="text-blue-600" />} label={text.group} onClick={() => window.open(TELEGRAM_LINK, '_blank')} />
        <ActionIcon icon={<Headset className="text-purple-600" />} label={text.service} onClick={() => window.open(TELEGRAM_LINK, '_blank')} />
      </div>

      {/* Product Tabs */}
      <div className="px-4 mt-8">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('long')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'long' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'}`}
          >
            {text.longTerm}
          </button>
          <button 
            onClick={() => setActiveTab('vip')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'vip' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}
          >
            {text.vipTerm}
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="px-4 mt-6 space-y-4 pb-24">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 group transition-all active:scale-[0.98]">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${activeTab === 'vip' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {activeTab === 'vip' ? <Star size={24} fill="currentColor" /> : <ShoppingBag size={24} />}
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm leading-none mb-1 uppercase tracking-tight">{p.name}</h3>
                <div className="flex items-center gap-1">
                  <Zap size={10} className={activeTab === 'vip' ? 'text-orange-500' : 'text-green-500'} />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activeTab === 'vip' ? 'VIP Investment' : 'Regular Plan'}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[9px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{text.price}</p>
                <p className="font-black text-slate-800 text-sm">{p.price.toLocaleString()} TK</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[9px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{text.daily}</p>
                <p className="font-black text-green-600 text-sm">{p.dailyIncome.toLocaleString()} TK</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[9px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{text.days}</p>
                <p className="font-black text-slate-800 text-sm">{p.days} Days</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[9px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{text.total}</p>
                <p className="font-black text-orange-600 text-sm">{p.totalIncome.toLocaleString()} TK</p>
              </div>
            </div>

            <button 
              onClick={() => handleBuyClick(p)}
              className={`w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'vip' ? 'gradient-accent shadow-orange-100' : 'gradient-primary shadow-green-100'} shadow-lg active:scale-95`}
            >
              {text.buyNow}
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActionIcon: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-active:scale-90 transition-all">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter text-center">{label}</span>
  </button>
);

export default HomeScreen;
