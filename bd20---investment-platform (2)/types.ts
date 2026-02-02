
export type Screen = 
  | 'auth' 
  | 'home' 
  | 'recharge' 
  | 'withdraw' 
  | 'team' 
  | 'profile' 
  | 'invite' 
  | 'withdraw-history' 
  | 'my-products' 
  | 'account-records' 
  | 'bank-password' 
  | 'company-profile'
  | 'admin-panel';

export interface Product {
  id: string;
  name: string;
  price: number;
  dailyIncome: number;
  days: number;
  totalIncome: number;
  type: 'long' | 'vip';
}

export interface PurchasedProduct extends Product {
  purchaseDate: number;
  lastClaimTime: number;
  remainingDays: number;
  collectedIncome: number;
}

export interface Transaction {
  id: string;
  userPhone: string;
  type: 'recharge' | 'withdraw' | 'purchase' | 'income';
  amount: number;
  date: string;
  status: 'pending' | 'success' | 'failed';
  utr?: string;
  method?: string;
  // Added account property to fix errors in App.tsx and WithdrawHistoryScreen.tsx
  account?: string;
}

// Fixed: Added WithdrawRecord interface required by constants.tsx and WithdrawHistoryScreen.tsx
export interface WithdrawRecord {
  id: string;
  amount: number;
  finalAmount: number;
  bank: string;
  account: string;
  status: 'pending' | 'success' | 'failed';
  date: string;
}

export interface User {
  id: string;
  phone: string;
  password?: string;
  withdrawPassword?: string;
  balance: number;
  rechargeAmount: number;
  withdrawAmount: number;
  referCode: string;
  bankName?: string;
  bankAccount?: string;
  fullName?: string;
  isAdmin?: boolean;
}

export enum Language {
  BN = 'BN',
  EN = 'EN'
}
