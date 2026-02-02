
import React, { useState, useEffect } from 'react';
import { 
  Home, Users, User as UserIcon, Share2, ArrowLeft, ShoppingBag, 
  CreditCard, Lock, ArrowRight, TrendingUp, Clock, ShieldCheck, Check, X, Bell, Wallet, Info
} from 'lucide-react';
import { Screen, Language, Product, User, Transaction, PurchasedProduct } from './types';
import { PRODUCTS } from './constants';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import RechargeScreen from './screens/RechargeScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import TeamScreen from './screens/TeamScreen';
import ProfileScreen from './screens/ProfileScreen';
import InviteScreen from './screens/InviteScreen';
import WithdrawHistoryScreen from './screens/WithdrawHistoryScreen';

// --- ADMIN CREDENTIALS ---
const ADMIN_PHONE = '01786516131';
const ADMIN_PASS = 'arafat335';

// --- ADMIN PANEL SCREEN ---
const AdminPanel = ({ setScreen, transactions, onApprove, onReject }: any) => {
  const pending = transactions.filter((t: any) => t.status === 'pending');

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <button onClick={() => setScreen('profile')} className="p-2 -ml-2 rounded-full active:bg-slate-100"><ArrowLeft size={24} /></button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">অ্যাডমিন কন্ট্রোল</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">পেন্ডিং রিকোয়েস্ট ({pending.length})</h2>
           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        
        {pending.length === 0 ? (
          <div className="py-24 text-center">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-slate-300" />
             </div>
             <p className="text-slate-400 font-bold">কোন পেন্ডিং রিকোয়েস্ট নেই</p>
          </div>
        ) : (
          pending.map((t: any) => (
            <div key={t.id} className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 mb-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${t.type === 'recharge' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.type === 'recharge' ? 'রিচার্জ' : 'উইথড্র'}
                  </span>
                  <p className="text-xl font-black text-slate-800 mt-1">{t.amount} TK</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">User: {t.userPhone}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Method</p>
                  <p className="text-xs font-black text-slate-700">{t.method || 'N/A'}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-2xl mb-5 border border-slate-100">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">
                  {t.type === 'recharge' ? 'UTR / Trans ID' : 'Target Account'}
                </p>
                <p className="text-sm font-mono font-black text-slate-600 break-all tracking-tight">
                  {t.type === 'recharge' ? t.utr : t.account}
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => onApprove(t.id)} 
                  className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-green-100 transition-all"
                >
                  <Check size={16} /> APPROVE
                </button>
                <button 
                  onClick={() => onReject(t.id)} 
                  className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-red-100 transition-all"
                >
                  <X size={16} /> REJECT
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('auth');
  const [lang, setLang] = useState<Language>(Language.BN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('bd20_final_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('bd20_final_txs');
    return saved ? JSON.parse(saved) : [];
  });
  const [myProducts, setMyProducts] = useState<PurchasedProduct[]>([]);

  // Sync users to storage
  useEffect(() => {
    localStorage.setItem('bd20_final_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync transactions to storage
  useEffect(() => {
    localStorage.setItem('bd20_final_txs', JSON.stringify(transactions));
  }, [transactions]);

  // Load user specific data
  useEffect(() => {
    if (currentUser) {
      const savedProds = localStorage.getItem(`final_prods_${currentUser.phone}`);
      setMyProducts(savedProds ? JSON.parse(savedProds) : []);
    }
  }, [currentUser?.phone]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`final_prods_${currentUser.phone}`, JSON.stringify(myProducts));
    }
  }, [myProducts, currentUser?.phone]);

  // Real-time Income Logic
  useEffect(() => {
    if (!isLoggedIn || !currentUser || myProducts.length === 0) return;

    const interval = setInterval(() => {
      let totalEarned = 0;
      const now = Date.now();
      const updated = myProducts.map(p => {
        const elapsed = (now - p.lastClaimTime) / 1000;
        const perSec = p.dailyIncome / (24 * 3600);
        const earned = elapsed * perSec;
        if (earned >= 0.0001) {
          totalEarned += earned;
          return { ...p, lastClaimTime: now, collectedIncome: p.collectedIncome + earned };
        }
        return p;
      });

      if (totalEarned > 0) {
        setMyProducts(updated);
        updateUserLocally({ balance: (currentUser.balance || 0) + totalEarned });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isLoggedIn, currentUser?.phone, myProducts]);

  const updateUserLocally = (updates: Partial<User>) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      setRegisteredUsers(users => users.map(u => u.phone === updated.phone ? updated : u));
      return updated;
    });
  };

  const handleLogin = (user: User) => {
    // Check for hardcoded admin credentials
    const isMasterAdmin = user.phone === ADMIN_PHONE && user.password === ADMIN_PASS;
    const userData = { ...user, isAdmin: isMasterAdmin };
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setScreen('home');
  };

  const handleRegister = (newUser: User) => {
    setRegisteredUsers(prev => [...prev, newUser]);
    handleLogin(newUser);
  };

  const submitRecharge = (data: { amount: number; utr: string; method: string }) => {
    if (!currentUser) return;
    const newTx: Transaction = {
      id: 'RC' + Date.now(),
      userPhone: currentUser.phone,
      type: 'recharge',
      amount: data.amount,
      utr: data.utr,
      method: data.method,
      date: new Date().toLocaleString(),
      status: 'pending'
    };
    setTransactions(prev => [newTx, ...prev]);
    alert('রিচার্জ রিকোয়েস্ট পাঠানো হয়েছে। অ্যাডমিন চেক করে ব্যালেন্স যোগ করবেন।');
    setScreen('home');
  };

  const submitWithdraw = (data: { amount: number; method: string; account: string }) => {
    if (!currentUser) return;
    
    // Deduct balance immediately (locked)
    updateUserLocally({ balance: currentUser.balance - data.amount });
    
    const newTx: Transaction = {
      id: 'WD' + Date.now(),
      userPhone: currentUser.phone,
      type: 'withdraw',
      amount: data.amount,
      method: data.method,
      account: data.account, // Reusing field for target account
      date: new Date().toLocaleString(),
      status: 'pending'
    };
    setTransactions(prev => [newTx, ...prev]);
    alert('উইথড্র রিকোয়েস্ট পাঠানো হয়েছে। অ্যাডমিন অ্যাপ্রুভ করলে আপনার নাম্বারে টাকা চলে যাবে।');
    setScreen('home');
  };

  const handleApprove = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx) return;

    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'success' } : t));

    if (tx.type === 'recharge') {
      setRegisteredUsers(users => users.map(u => {
        if (u.phone === tx.userPhone) {
          const updated = { 
            ...u, 
            balance: (u.balance || 0) + tx.amount, 
            rechargeAmount: (u.rechargeAmount || 0) + tx.amount 
          };
          if (currentUser && currentUser.phone === u.phone) setCurrentUser(updated);
          return updated;
        }
        return u;
      }));
    } else if (tx.type === 'withdraw') {
      setRegisteredUsers(users => users.map(u => {
        if (u.phone === tx.userPhone) {
          const updated = { 
            ...u, 
            withdrawAmount: (u.withdrawAmount || 0) + tx.amount 
          };
          if (currentUser && currentUser.phone === u.phone) setCurrentUser(updated);
          return updated;
        }
        return u;
      }));
    }
    alert('সফলভাবে অ্যাপ্রুভ করা হয়েছে!');
  };

  const handleReject = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx) return;

    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'failed' } : t));

    // Refund for Withdraw
    if (tx.type === 'withdraw') {
      setRegisteredUsers(users => users.map(u => {
        if (u.phone === tx.userPhone) {
          const updated = { ...u, balance: (u.balance || 0) + tx.amount };
          if (currentUser && currentUser.phone === u.phone) setCurrentUser(updated);
          return updated;
        }
        return u;
      }));
      alert('রিকোয়েস্ট বাতিল করা হয়েছে এবং ইউজারের ব্যালেন্স রিফান্ড করা হয়েছে।');
    } else {
      alert('রিচার্জ রিকোয়েস্ট বাতিল করা হয়েছে।');
    }
  };

  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  const renderScreen = () => {
    if (!isLoggedIn) return <AuthScreen onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} registeredUsers={registeredUsers} lang={lang} setLang={setLang} />;
    if (!currentUser) return null;

    switch (screen) {
      case 'home': return <HomeScreen setScreen={setScreen} lang={lang} user={currentUser} onPurchase={(p) => {
        if (currentUser.balance >= p.price) {
          updateUserLocally({ balance: currentUser.balance - p.price });
          setMyProducts(prev => [...prev, { ...p, purchaseDate: Date.now(), lastClaimTime: Date.now(), remainingDays: p.days, collectedIncome: 0 }]);
          setTransactions(prev => [{ id: 'PR'+Date.now(), userPhone: currentUser.phone, type: 'purchase', amount: p.price, date: new Date().toLocaleString(), status: 'success' }, ...prev]);
          return true;
        }
        return false;
      }} />;
      case 'recharge': return <RechargeScreen setScreen={setScreen} lang={lang} onRechargeSubmit={submitRecharge} />;
      case 'withdraw': return <WithdrawScreen setScreen={setScreen} lang={lang} user={currentUser} onWithdrawSubmit={submitWithdraw} />;
      case 'team': return <TeamScreen setScreen={setScreen} lang={lang} user={currentUser} />;
      case 'profile': return <ProfileScreen setScreen={setScreen} lang={lang} user={currentUser} onLogout={() => { setIsLoggedIn(false); setCurrentUser(null); setScreen('auth'); }} pendingCount={pendingCount} />;
      case 'admin-panel': return <AdminPanel setScreen={setScreen} transactions={transactions} onApprove={handleApprove} onReject={handleReject} />;
      case 'account-records': return <AccountRecordScreen transactions={transactions.filter(t => t.userPhone === currentUser.phone)} lang={lang} setScreen={setScreen} />;
      case 'invite': return <InviteScreen setScreen={setScreen} lang={lang} user={currentUser} />;
      case 'withdraw-history': return <WithdrawHistoryScreen setScreen={setScreen} lang={lang} transactions={transactions.filter(t => t.userPhone === currentUser.phone && t.type === 'withdraw')} />;
      case 'my-products': return <MyProductScreen setScreen={setScreen} lang={lang} products={myProducts} />;
      case 'bank-password': return <BankPasswordScreen setScreen={setScreen} lang={lang} user={currentUser} onUpdate={updateUserLocally} />;
      case 'company-profile': return <CompanyProfileScreen setScreen={setScreen} lang={lang} />;
      default: return <HomeScreen setScreen={setScreen} lang={lang} user={currentUser} onPurchase={() => false} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20 shadow-xl overflow-x-hidden">
      {renderScreen()}
      {isLoggedIn && (
        <nav className="fixed bottom-0 max-w-md w-full bg-white border-t flex justify-around py-3 px-2 z-50 rounded-t-[32px] shadow-2xl">
          <NavItem active={screen === 'home'} onClick={() => setScreen('home')} icon={<Home size={22} />} label={lang === Language.BN ? 'হোম' : 'Home'} />
          <NavItem active={screen === 'invite'} onClick={() => setScreen('invite')} icon={<Share2 size={22} />} label={lang === Language.BN ? 'ইনভাইট' : 'Invite'} />
          <NavItem active={screen === 'team'} onClick={() => setScreen('team')} icon={<Users size={22} />} label={lang === Language.BN ? 'টিম' : 'Team'} />
          <NavItem 
            active={['profile', 'admin-panel', 'account-records', 'invite', 'withdraw-history', 'my-products'].includes(screen)} 
            onClick={() => setScreen('profile')} 
            icon={<UserIcon size={22} />} 
            label={lang === Language.BN ? 'প্রোফাইল' : 'My'} 
            badge={currentUser.isAdmin && pendingCount > 0 ? pendingCount : 0}
          />
        </nav>
      )}
    </div>
  );
};

// --- Nav Item ---
const NavItem = ({ active, onClick, icon, label, badge }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all relative ${active ? 'text-green-700 scale-110' : 'text-slate-400'}`}>
    {badge > 0 && (
      <span className="absolute -top-1 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce">
        {badge}
      </span>
    )}
    <div className={`p-1.5 rounded-xl ${active ? 'bg-green-50' : ''}`}>{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

// --- Sub Screens ---
const AccountRecordScreen = ({ transactions, lang, setScreen }: any) => (
  <div className="bg-slate-50 min-h-screen pb-10">
    <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10">
      <button onClick={() => setScreen('profile')} className="p-2 -ml-2 rounded-full active:bg-slate-100"><ArrowLeft size={24} /></button>
      <h1 className="text-xl font-bold">{lang === 'BN' ? 'অ্যাকাউন্ট রেকর্ড' : 'Account Records'}</h1>
    </div>
    <div className="p-4 space-y-3">
      {transactions.length === 0 ? (
        <div className="py-24 text-center opacity-30">
           <Clock size={48} className="mx-auto mb-3" />
           <p className="font-bold">কোন রেকর্ড পাওয়া যায়নি</p>
        </div>
      ) : 
        transactions.map((t: any) => (
          <div key={t.id} className="p-5 bg-white rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm">
            <div>
              <p className={`font-black uppercase text-[10px] tracking-widest ${t.status === 'pending' ? 'text-orange-500' : 'text-slate-700'}`}>
                {t.type} {t.status === 'pending' && '(পেন্ডিং)'}
                {t.status === 'failed' && <span className="text-red-500"> (বাতিল)</span>}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">{t.date}</p>
            </div>
            <p className={`font-black text-sm ${t.type === 'recharge' || t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
              {t.type === 'recharge' || t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)} TK
            </p>
          </div>
        ))
      }
    </div>
  </div>
);

const MyProductScreen = ({ setScreen, lang, products }: any) => (
  <div className="bg-slate-50 min-h-screen pb-10">
    <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10">
      <button onClick={() => setScreen('profile')} className="p-2 -ml-2 rounded-full active:bg-slate-100"><ArrowLeft size={24} /></button>
      <h1 className="text-xl font-bold">{lang === 'BN' ? 'আমার প্রোডাক্ট' : 'My Products'}</h1>
    </div>
    <div className="p-4 space-y-4">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 opacity-30">
          <ShoppingBag size={64} className="text-slate-300" />
          <p className="mt-4 font-bold text-slate-400">কোন প্রোডাক্ট কেনা নেই</p>
        </div>
      ) : 
        products.map((p: PurchasedProduct, idx: number) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex gap-4 items-center mb-4">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0"><ShoppingBag size={28} /></div>
              <div className="flex-1">
                <h3 className="font-black text-slate-800 text-sm leading-tight mb-1 uppercase">{p.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Date: {new Date(p.purchaseDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
               <div><p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Earned</p><p className="font-black text-green-600 text-sm">{p.collectedIncome.toFixed(2)} TK</p></div>
               <div className="text-right"><p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Remaining</p><p className="font-black text-slate-800 text-sm">{p.remainingDays} Days</p></div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

const BankPasswordScreen = ({ setScreen, lang, user, onUpdate }: any) => {
  const [bankAcc, setBankAcc] = useState(user.bankAccount || '');
  const handleUpdate = () => { onUpdate({ bankAccount: bankAcc }); alert('Updated!'); setScreen('profile'); };
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10">
        <button onClick={() => setScreen('profile')} className="p-2 -ml-2 rounded-full active:bg-slate-100"><ArrowLeft size={24} /></button>
        <h1 className="text-xl font-bold">ব্যাংক ও পাসওয়ার্ড</h1>
      </div>
      <div className="p-6 space-y-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
           <div><label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">ব্যাংক অ্যাকাউন্ট</label>
           <input className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-green-500 outline-none transition-all" value={bankAcc} onChange={(e) => setBankAcc(e.target.value)} /></div>
        </div>
        <button onClick={handleUpdate} className="w-full py-4 gradient-primary text-white rounded-full font-bold shadow-xl active:scale-95 transition-all">সেভ করুন</button>
      </div>
    </div>
  );
};

const CompanyProfileScreen = ({ setScreen, lang }: any) => (
  <div className="bg-white min-h-screen pb-10">
    <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10">
      <button onClick={() => setScreen('profile')} className="p-2 -ml-2 rounded-full active:bg-slate-100"><ArrowLeft size={24} /></button>
      <h1 className="text-xl font-bold">কোম্পানি প্রোফাইল</h1>
    </div>
    <div className="p-8 text-center space-y-6">
      <div className="w-24 h-24 gradient-primary rounded-[32px] mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl">BD</div>
      <h2 className="text-2xl font-black text-slate-800">BD20 Foods Ltd.</h2>
      <div className="bg-slate-50 p-6 rounded-[32px] text-slate-600 text-sm leading-relaxed border border-slate-100 text-justify">
        <p>আমরা নিরাপদ বিনিয়োগ এবং মানসম্মত ফুড প্রোডাক্ট এর মাধ্যমে মানুষের উপার্জনের পথ সহজ করছি। আমাদের সাথে বিনিয়োগ করে আপনি ঘরে বসেই প্রতিদিন ইনকাম করতে পারবেন।</p>
      </div>
    </div>
  </div>
);

export default App;
