'use client';

import { useState, useEffect } from 'react';
import { Expense } from './types';
import ExpenseCard from './components/ExpenseCard';
import AddExpenseForm from './components/AddExpenseForm';
import { Plus, Wallet, TrendingUp } from 'lucide-react';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gokarna_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gokarna_expenses', JSON.stringify(expenses));
    }
  }, [expenses, mounted]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense = { ...newExpense, id: crypto.randomUUID() };
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-96 bg-indigo-900/20 blur-3xl -z-10 rounded-b-[50%]" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-rose-900/10 blur-3xl -z-10 rounded-full" />

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                Gokarna Trip
              </h1>
              <p className="text-slate-400 text-sm font-medium">Expense Tracker</p>
            </div>
            <div className="w-12 h-12 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center shadow-lg">
              <Wallet className="w-6 h-6 text-indigo-400" />
            </div>
          </div>

          {/* Total Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 shadow-2xl shadow-indigo-900/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <p className="text-indigo-100 font-medium mb-1">Total Spent</p>
            <h2 className="text-4xl font-bold text-white mb-4">
              ₹{total.toLocaleString()}
            </h2>
            <div className="flex items-center gap-2 text-indigo-200 text-sm bg-white/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{expenses.length} transactions</span>
            </div>
          </div>
        </header>

        {/* List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-400 px-1">
            <span className="font-medium">Recent Expenses</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="mb-2">No expenses yet</p>
              <p className="text-xs">Tap + to add your first expense</p>
            </div>
          ) : (
            expenses.map(expense => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg shadow-rose-500/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40"
      >
        <Plus className="w-8 h-8" />
      </button>

      {isFormOpen && (
        <AddExpenseForm
          onAdd={addExpense}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </main>
  );
}
