
import React, { useState } from 'react';
import { Language, User } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
  onRegisterSuccess: (user: User) => void;
  registeredUsers: User[];
  lang: Language;
  setLang: (l: Language) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onRegisterSuccess, registeredUsers, lang, setLang }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');
  const [referCode, setReferCode] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = registeredUsers.find(u => u.phone === phone && u.password === password);
    
    if (user) {
      onLoginSuccess(user);
    } else {
      alert(lang === Language.BN ? 'ভুল ফোন নাম্বার অথবা পাসওয়ার্ড!' : 'Invalid phone number or password!');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length < 10) {
      alert(lang === Language.BN ? 'সঠিক ফোন নাম্বার দিন!' : 'Please enter a valid phone number!');
      return;
    }

    if (password !== confirmPassword) {
      alert(lang === Language.BN ? 'পাসওয়ার্ড মিলছে না!' : 'Passwords do not match!');
      return;
    }

    const exists = registeredUsers.some(u => u.phone === phone);
    if (exists) {
      alert(lang === Language.BN ? 'এই নাম্বারে ইতিমধ্যে একটি অ্যাকাউন্ট আছে!' : 'An account already exists with this number!');
      return;
    }

    const newUser: User = {
      id: 'BD' + Math.floor(100000 + Math.random() * 900000),
      phone,
      password,
      withdrawPassword: withdrawPassword || password,
      balance: 0,
      rechargeAmount: 0,
      withdrawAmount: 0,
      referCode: referCode || 'BD20NEW'
    };

    onRegisterSuccess(newUser);
  };

  const text = {
    login: lang === Language.BN ? 'লগইন' : 'Login',
    register: lang === Language.BN ? 'রেজিস্টার' : 'Register',
    phone: lang === Language.BN ? 'ফোন নাম্বার' : 'Phone Number',
    password: lang === Language.BN ? 'লগইন পাসওয়ার্ড' : 'Login Password',
    confirmPass: lang === Language.BN ? 'কনফার্ম পাসওয়ার্ড' : 'Confirm Password',
    withdrawPass: lang === Language.BN ? 'উইথড্র পাসওয়ার্ড' : 'Withdraw Password',
    referCode: lang === Language.BN ? 'রেফার কোড (ঐচ্ছিক)' : 'Refer Code (Optional)',
    submit: lang === Language.BN ? (tab === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট খুলুন') : (tab === 'login' ? 'Login Now' : 'Create Account'),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner */}
      <div className="h-72 relative gradient-primary rounded-b-[48px] shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-[100px]"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-green-700 text-3xl font-black shadow-xl mb-4 rotate-3">BD</div>
          <h1 className="text-white text-3xl font-black tracking-tight mb-2">BD20 FOODS</h1>
          <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Safe Investment Platform</p>
        </div>
        
        {/* Language Switcher */}
        <div className="absolute top-6 right-6 flex bg-black/10 backdrop-blur-md p-1 rounded-full border border-white/20">
          <button 
            onClick={() => setLang(Language.BN)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === Language.BN ? 'bg-white text-green-700' : 'text-white'}`}
          >
            BN
          </button>
          <button 
            onClick={() => setLang(Language.EN)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === Language.EN ? 'bg-white text-green-700' : 'text-white'}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="flex-1 px-8 pt-10">
        {/* Tabs */}
        <div className="flex mb-10 bg-slate-100 p-1.5 rounded-3xl border border-slate-100">
          <button 
            onClick={() => { setTab('login'); setPhone(''); setPassword(''); }}
            className={`flex-1 py-4 text-xs font-black rounded-2xl transition-all uppercase tracking-widest ${tab === 'login' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}
          >
            {text.login}
          </button>
          <button 
            onClick={() => { setTab('register'); setPhone(''); setPassword(''); }}
            className={`flex-1 py-4 text-xs font-black rounded-2xl transition-all uppercase tracking-widest ${tab === 'register' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-400'}`}
          >
            {text.register}
          </button>
        </div>

        <form onSubmit={tab === 'login' ? handleLogin : handleRegister} className="space-y-6 pb-20">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{text.phone}</label>
            <input 
              type="tel" 
              placeholder="01xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-green-500 transition-all font-bold text-slate-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{text.password}</label>
            <input 
              type="password" 
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-green-500 transition-all font-bold text-slate-700"
              required
            />
          </div>

          {tab === 'register' && (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{text.confirmPass}</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-green-500 transition-all font-bold text-slate-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{text.withdrawPass}</label>
                <input 
                  type="password" 
                  value={withdrawPassword}
                  onChange={(e) => setWithdrawPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-green-500 transition-all font-bold text-slate-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{text.referCode}</label>
                <input 
                  type="text" 
                  value={referCode}
                  onChange={(e) => setReferCode(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-green-500 transition-all font-bold text-slate-700"
                />
              </div>
            </>
          )}

          <button 
            type="submit"
            className="w-full py-5 gradient-primary text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-green-100 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            {text.submit}
          </button>
          
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-10">
            © 2024 BD20 FOODS LTD. SAFE & SECURE
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
