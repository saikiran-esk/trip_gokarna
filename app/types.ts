export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO string
  category: string;
  comment?: string;
}
