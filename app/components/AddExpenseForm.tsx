import { useState, useEffect } from 'react';
import { Expense } from '../types';
import { Plus, X, Loader2 } from 'lucide-react';

interface Props {
    onAdd: (expense: Omit<Expense, 'id'>) => void;
    onClose: () => void;
}

export default function AddExpenseForm({ onAdd, onClose }: Props) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [isLoadingTime, setIsLoadingTime] = useState(true);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
                const data = await response.json();
                // API returns ISO string with offset, e.g., "2023-11-28T23:30:00.000000+05:30"
                // We need to format it for datetime-local input: "YYYY-MM-DDTHH:mm"
                const apiDate = new Date(data.datetime);
                // Adjust to local time representation of that timezone
                const istString = apiDate.toLocaleString('en-CA', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).replace(', ', 'T');

                setDate(istString);
            } catch (error) {
                console.error('Failed to fetch time:', error);
                // Fallback to calculated IST
                const now = new Date();
                const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
                const istOffset = 5.5 * 60 * 60 * 1000;
                const istTime = new Date(utc + istOffset);
                setDate(istTime.toISOString().slice(0, 16));
            } finally {
                setIsLoadingTime(false);
            }
        };

        fetchTime();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount) return;

        onAdd({
            description,
            amount: parseFloat(amount),
            category,
            comment,
            // Treat the selected time as IST
            date: new Date(`${date}:00+05:30`).toISOString(),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">New Expense</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Dinner at Namaste Cafe"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Date & Time</label>
                        <div className="relative">
                            <input
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                disabled={isLoadingTime}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                            />
                            {isLoadingTime && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Amount (₹)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
                            >
                                <option>Food</option>
                                <option>Travel</option>
                                <option>Stay</option>
                                <option>Activity</option>
                                <option>Shopping</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Comment (Optional)</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                            rows={3}
                            placeholder="Any details..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
}
