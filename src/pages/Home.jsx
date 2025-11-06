import { Wallet, HandCoins, TrendingUp, TrendingDown, Users, Package } from 'lucide-react';
import FolderCard from '../components/cards/FolderCard';
import QuickStats from '../components/cards/QuickStats';

export default function Home({ transactions, onCategoryClick }) {
  const calculateStats = () => {
    const stats = {
      'Loans': { amount: 0, count: 0 },
      'Money In': { amount: 0, count: 0 },
      'Money Out': { amount: 0, count: 0 },
      'Customers': { amount: 0, count: 0 },
      'Suppliers': { amount: 0, count: 0 }
    };

    let totalIn = 0;
    let totalOut = 0;

    transactions.forEach(t => {
      if (stats[t.category]) {
        stats[t.category].amount += t.amount;
        stats[t.category].count += 1;
      }

      if (t.type === 'credit' || t.type === 'customer') {
        totalIn += t.amount;
      } else if (t.type === 'debit' || t.type === 'supplier') {
        totalOut += t.amount;
      }
    });

    return { stats, totalIn, totalOut };
  };

  const { stats, totalIn, totalOut } = calculateStats();

  const folders = [
    {
      icon: HandCoins,
      title: 'Loans',
      amount: stats['Loans'].amount,
      count: stats['Loans'].count,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Money In',
      amount: stats['Money In'].amount,
      count: stats['Money In'].count,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingDown,
      title: 'Money Out',
      amount: stats['Money Out'].amount,
      count: stats['Money Out'].count,
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: Users,
      title: 'Customers',
      amount: stats['Customers'].amount,
      count: stats['Customers'].count,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Package,
      title: 'Suppliers',
      amount: stats['Suppliers'].amount,
      count: stats['Suppliers'].count,
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <div>
      <QuickStats totalIn={totalIn} totalOut={totalOut} />
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4 mt-4 mx-2 text-gray-800">Categories</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {folders.map((folder, index) => (
          <FolderCard
            key={index}
            {...folder}
            onClick={() => onCategoryClick(folder.title)}
          />
        ))}
      </div>
    </div>
  );
}
