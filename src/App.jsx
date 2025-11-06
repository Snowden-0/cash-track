import { useState, useEffect } from 'react';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import AddTransaction from './pages/AddTransaction';
import Search from './pages/Search';
import Settings from './pages/Settings';
import TransactionDetail from './pages/TransactionDetail';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      category: 'Money In',
      amount: 15000,
      description: 'Monthly donation',
      date: '2025-10-01',
      type: 'credit',
      person: 'Ahmed Khan'
    },
    {
      id: 2,
      category: 'Money Out',
      amount: 5000,
      description: 'Utility bills',
      date: '2025-10-02',
      type: 'debit',
      person: 'Electric Company'
    },
    {
      id: 3,
      category: 'Loans',
      amount: 50000,
      description: 'Personal loan to Abdul',
      date: '2025-09-28',
      type: 'loan',
      person: 'Abdul Rahman'
    },
    {
      id: 4,
      category: 'Customers',
      amount: 8500,
      description: 'Product payment',
      date: '2025-10-03',
      type: 'customer',
      person: 'Bilal Traders'
    },
    {
      id: 5,
      category: 'Suppliers',
      amount: 12000,
      description: 'Stock purchase',
      date: '2025-10-04',
      type: 'supplier',
      person: 'Wholesale Co.'
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Reset selectedCategory when activeTab changes
  useEffect(() => {
    setSelectedCategory(null);
  }, [activeTab]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const renderPage = () => {
    if (selectedCategory) {
      return (
        <TransactionDetail
          category={selectedCategory}
          transactions={transactions.filter(t => t.category === selectedCategory)}
          onBack={() => setSelectedCategory(null)}
          onDelete={deleteTransaction}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home transactions={transactions} onCategoryClick={setSelectedCategory} />;
      case 'analytics':
        return <Analytics transactions={transactions} />;
      case 'add':
        return <AddTransaction onAdd={addTransaction} onBack={() => setActiveTab('home')} />;
      case 'search':
        return <Search transactions={transactions} />;
      case 'settings':
        return <Settings />;
      default:
        return <Home transactions={transactions} onCategoryClick={setSelectedCategory} />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderPage()}
    </MainLayout>
  );
}