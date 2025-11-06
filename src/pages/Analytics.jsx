import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';

// Theme Constants - Easy to modify
const THEME = {
  // Page
  pageTitle: 'text-gray-900',
  pageSubtitle: 'text-gray-500',
  
  // Cards
  cardBg: 'bg-white',
  cardBorder: 'border-gray-100',
  cardShadow: 'shadow-sm',
  
  // Stats Cards
  statsIconBg: {
    primary: 'bg-white',
    secondary: 'bg-white',
  },
  statsIconColor: {
    primary: 'text-gray-900',
    secondary: 'text-red-700',
  },
  statsLabel: 'text-gray-500',
  statsValue: 'text-gray-900',
  
  // Section Headers
  sectionIcon: 'text-gray-700',
  sectionTitle: 'text-gray-900',
  
  // Progress Bars
  progressBg: 'bg-gray-100',
  progressIncome: 'bg-gray-900',
  progressExpense: 'bg-red-700',
  progressCategory: 'bg-gray-900',
  
  // Text Colors
  incomeText: 'text-gray-900',
  expenseText: 'text-gray-900',
  labelText: 'text-gray-600',
  valueText: 'text-gray-900',
};

export default function Analytics({ transactions }) {
  const getMonthlyStats = () => {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'credit' || t.type === 'customer') {
        monthlyData[month].income += t.amount;
      } else if (t.type === 'debit' || t.type === 'supplier') {
        monthlyData[month].expense += t.amount;
      }
    });
    
    return Object.entries(monthlyData).slice(-3);
  };

  const getCategoryBreakdown = () => {
    const breakdown = {};
    
    transactions.forEach(t => {
      if (!breakdown[t.category]) {
        breakdown[t.category] = 0;
      }
      breakdown[t.category] += t.amount;
    });
    
    return Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  };

  const monthlyStats = getMonthlyStats();
  const categoryBreakdown = getCategoryBreakdown();
  const totalTransactions = transactions.length;
  const avgTransaction = transactions.reduce((sum, t) => sum + t.amount, 0) / totalTransactions || 0;

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${THEME.pageTitle} mb-1`}>Analytics</h2>
        <p className={`text-sm ${THEME.pageSubtitle}`}>Financial insights and trends</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${THEME.cardBg} rounded-2xl p-4 border ${THEME.cardBorder} ${THEME.cardShadow}`}>
          <div className={`w-10 h-10 rounded-xl ${THEME.statsIconBg.primary} flex items-center justify-center mb-3`}>
            <Calendar className={`w-5 h-5 ${THEME.statsIconColor.primary}`} />
          </div>
          <p className={`${THEME.statsLabel} text-xs font-medium mb-1`}>Total Transactions</p>
          <p className={`text-2xl font-bold ${THEME.statsValue}`}>{totalTransactions}</p>
        </div>
        
        <div className={`${THEME.cardBg} rounded-2xl p-4 border ${THEME.cardBorder} ${THEME.cardShadow}`}>
          <div className={`w-10 h-10 rounded-xl ${THEME.statsIconBg.secondary} flex items-center justify-center mb-3`}>
            <DollarSign className={`w-5 h-5 ${THEME.statsIconColor.secondary}`} />
          </div>
          <p className={`${THEME.statsLabel} text-xs font-medium mb-1`}>Avg Transaction</p>
          <p className={`text-2xl font-bold ${THEME.statsValue}`}>Rs {avgTransaction.toFixed(0)}</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className={`${THEME.cardBg} rounded-2xl p-5 border ${THEME.cardBorder} ${THEME.cardShadow}`}>
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className={`w-5 h-5 ${THEME.sectionIcon}`} />
          <h3 className={`text-lg font-semibold ${THEME.sectionTitle}`}>Monthly Trends</h3>
        </div>
        
        <div className="space-y-5">
          {monthlyStats.map(([month, data]) => (
            <div key={month}>
              <p className={`${THEME.labelText} text-sm font-medium mb-3`}>{month}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${THEME.incomeText} text-sm font-medium`}>Income</span>
                    <span className={`${THEME.valueText} font-semibold text-sm`}>Rs {data.income.toLocaleString()}</span>
                  </div>
                  <div className={`w-full ${THEME.progressBg} rounded-full h-2`}>
                    <div 
                      className={`${THEME.progressIncome} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min((data.income / 100000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${THEME.expenseText} text-sm font-medium`}>Expense</span>
                    <span className={`${THEME.valueText} font-semibold text-sm`}>Rs {data.expense.toLocaleString()}</span>
                  </div>
                  <div className={`w-full ${THEME.progressBg} rounded-full h-2`}>
                    <div 
                      className={`${THEME.progressExpense} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min((data.expense / 100000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className={`${THEME.cardBg} rounded-2xl p-5 border ${THEME.cardBorder} ${THEME.cardShadow}`}>
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className={`w-5 h-5 ${THEME.sectionIcon}`} />
          <h3 className={`text-lg font-semibold ${THEME.sectionTitle}`}>Category Breakdown</h3>
        </div>
        
        <div className="space-y-4">
          {categoryBreakdown.map(([category, amount]) => {
            const maxAmount = categoryBreakdown[0][1];
            const percentage = (amount / maxAmount) * 100;
            
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`${THEME.labelText} text-sm font-medium`}>{category}</span>
                  <span className={`${THEME.valueText} font-semibold text-sm`}>Rs {amount.toLocaleString()}</span>
                </div>
                <div className={`w-full ${THEME.progressBg} rounded-full h-2`}>
                  <div 
                    className={`${THEME.progressCategory} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}