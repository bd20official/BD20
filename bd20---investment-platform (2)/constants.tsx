
import { Product, WithdrawRecord, User } from './types';

export const MOCK_USER: User = {
  id: 'BD882045',
  phone: '01712345678',
  password: 'password123',
  withdrawPassword: 'password123',
  balance: 0.00,
  rechargeAmount: 0,
  withdrawAmount: 0,
  referCode: 'PRAN2024',
  bankName: 'bKash',
  bankAccount: '01712345678',
  fullName: 'Demo User'
};

export const MOCK_WITHDRAWALS: WithdrawRecord[] = [];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'PRAN Frooto Mango Drink',
    price: 600,
    dailyIncome: 130,
    days: 180,
    totalIncome: 23400,
    type: 'long'
  },
  {
    id: '2',
    name: 'PRAN Up Lemon Drink',
    price: 1200,
    dailyIncome: 280,
    days: 180,
    totalIncome: 50400,
    type: 'long'
  },
  {
    id: '3',
    name: 'PRAN Litchi Drink - Giant Pack',
    price: 3000,
    dailyIncome: 750,
    days: 150,
    totalIncome: 112500,
    type: 'long'
  },
  {
    id: '4',
    name: 'PRAN Potato Spicy Biscuits VIP',
    price: 5000,
    dailyIncome: 1500,
    days: 30,
    totalIncome: 45000,
    type: 'vip'
  },
  {
    id: '5',
    name: 'PRAN All Time Bun Special VIP',
    price: 10000,
    dailyIncome: 3500,
    days: 20,
    totalIncome: 70000,
    type: 'vip'
  }
];
