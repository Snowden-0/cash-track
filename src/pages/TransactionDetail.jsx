import { ArrowLeft } from 'lucide-react';
import TransactionCard from '../components/cards/TransactionCard';

const THEME = {
  // Page
  pageTitle: 'text-gray-900',
  pageSubtitle: 'text-gray-500',
  
  // Cards
  cardBg: 'bg-white',
  cardBorder: 'border-gray-100',
  cardShadow: 'shadow-sm',

  // Section Headers
  sectionTitle: 'text-gray-900',

  // Text
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textTertiary: 'text-gray-500',
  textAmountIn: 'text-green-700',
  textAmountOut: 'text-red-700',
  
  // Empty State
  emptyStateBg: 'bg-gray-50',
  emptyStateBorder: 'border-gray-100',
  emptyStateIcon: 'text-gray-300',
  emptyStateText: 'text-gray-600',
  emptyStateSubtext: 'text-gray-500',
};

export default function TransactionDetail({ category, transactions, onBack, onDelete }) {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 text-sm font-medium ${THEME.textSecondary} hover:${THEME.textPrimary} transition-colors focus:outline-none`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Category Header Card */}
      <div className={`${THEME.cardBg} rounded-2xl p-5 border ${THEME.cardBorder} ${THEME.cardShadow}`}>
        <h2 className={`text-2xl font-bold ${THEME.pageTitle} mb-1`}>{category}</h2>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className={`text-3xl font-bold ${THEME.textPrimary}`}>
            Rs {totalAmount.toLocaleString()}
          </span>
          <span className={`text-sm ${THEME.pageSubtitle}`}>
            • {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Transactions List */}
      <div>
        <h3 className={`text-base font-semibold ${THEME.sectionTitle} mb-4`}>
          All Transactions
        </h3>
        
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={onDelete}
                />
              ))}
          </div>
        ) : (
          // Empty State - Styled like Search.jsx
          <div className={`${THEME.emptyStateBg} rounded-2xl p-8 border ${THEME.emptyStateBorder} text-center`}>
            <Info className={`w-12 h-12 ${THEME.emptyStateIcon} mx-auto mb-3`} />
            <p className={`${THEME.emptyStateText} font-medium`}>No transactions found</p>
            <p className={`${THEME.emptyStateSubtext} text-sm mt-1`}>
              There are no transactions in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
