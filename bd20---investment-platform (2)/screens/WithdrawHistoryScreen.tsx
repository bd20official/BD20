
import React from 'react';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Banknote } from 'lucide-react';
import { Screen, Language, Transaction } from '../types';

interface WithdrawHistoryScreenProps {
  setScreen: (s: Screen) => void;
  lang: Language;
  transactions: Transaction[];
}

const WithdrawHistoryScreen: React.FC<WithdrawHistoryScreenProps> = ({ setScreen, lang, transactions }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="flex items-center gap-1 text-[8px] font-black uppercase text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 tracking-widest"><CheckCircle2 size={10} /> {lang === Language.BN ? 'সফল' : 'Success'}</span>;
      case 'pending':
        return <span className="flex items-center gap-1 text-[8px] font-black uppercase text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 tracking-widest"><Clock size={10} /> {lang === Language.BN ? 'অপেক্ষমাণ' : 'Pending'}</span>;
      case 'failed':
        return <span className="flex items-center gap-1 text-[8px] font-black uppercase text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100 tracking-widest"><XCircle size={10} /> {lang === Language.BN ? 'ব্যর্থ' : 'Failed'}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <div className="p-4 flex items-center gap-4 bg-white sticky top-0 z-10 border-b">
        <button onClick={() => setScreen('profile')} className="p-2 -ml-2 rounded-full active:bg-slate-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{lang === Language.BN ? 'উইথড্র ইতিহাস' : 'Withdraw History'}</h1>
      </div>

      <div className="p-4 space-y-4">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 opacity-30">
            <Banknote size={60} />
            <p className="mt-4 font-bold uppercase text-[10px] tracking-widest">{lang === Language.BN ? 'কোন তথ্য পাওয়া যায়নি' : 'No records found'}</p>
          </div>
        ) : (
          transactions.map((record) => (
            <div key={record.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">{lang === Language.BN ? 'ট্রানজেকশন আইডি' : 'Transaction ID'}</p>
                  <p className="font-mono font-black text-slate-700 text-xs tracking-tight">{record.id}</p>
                </div>
                {getStatusBadge(record.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">{lang === Language.BN ? 'পরিমাণ' : 'Amount'}</p>
                  <p className="font-black text-slate-800 text-lg">{record.amount} <span className="text-[10px]">TK</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">{lang === Language.BN ? 'পদ্ধতি' : 'Method'}</p>
                  <p className="font-black text-slate-700 text-sm">{record.method}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-[10px] font-bold text-slate-500">
                  A/C: <span className="text-slate-800">{record.account || '---'}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{record.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <p className="text-center text-[9px] text-slate-400 mt-10 font-bold uppercase tracking-widest">
        Showing last 30 transactions
      </p>
    </div>
  );
};

export default WithdrawHistoryScreen;
