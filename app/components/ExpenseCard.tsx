import { Expense } from '../types';
import { Trash2, MessageSquare } from 'lucide-react';

interface Props {
    expense: Expense;
    onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, onDelete }: Props) {
    return (
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 flex justify-between items-start shadow-lg hover:shadow-xl transition-all animate-in fade-in slide-in-from-bottom-4">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {expense.category}
                    </span>
                    <span className="text-slate-400 text-xs">
                        {new Date(expense.date).toLocaleString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{expense.description}</h3>
                {expense.comment && (
                    <div className="flex items-start gap-1.5 mt-2 text-slate-400 text-sm bg-slate-900/30 p-2 rounded-lg">
                        <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>{expense.comment}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-end gap-3 ml-4">
                <span className="text-xl font-bold text-emerald-400">
                    ₹{expense.amount.toLocaleString()}
                </span>
                <button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    aria-label="Delete expense"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
