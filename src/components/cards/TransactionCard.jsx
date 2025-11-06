import { Trash2, Calendar, User } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

// Theme Constants - Easy to modify
const THEME = {
  // Card
  cardBg: 'bg-white',
  cardBorder: 'border-gray-100',
  cardShadow: 'shadow-sm',
  cardHoverShadow: 'hover:shadow-md',
  cardHoverBorder: 'hover:border-gray-200',
  
  // Text
  descriptionText: 'text-gray-900',
  metaText: 'text-gray-500',
  metaIcon: 'text-gray-400',
  
  // Amount
  creditAmount: 'text-emerald-600',
  debitAmount: 'text-rose-600',
  
  // Delete Button
  deleteBtnHoverBg: 'hover:bg-red-50',
  deleteBtnIcon: 'text-red-500',
  
  // Category Badge
  badgeBg: 'bg-gray-100',
  badgeText: 'text-gray-600',
};

export default function TransactionCard({ transaction, onDelete }) {
  const isCredit = transaction.type === 'credit' || transaction.type === 'customer';
  
  return (
    <div className={`${THEME.cardBg} rounded-2xl p-4 border ${THEME.cardBorder} ${THEME.cardShadow} ${THEME.cardHoverShadow} ${THEME.cardHoverBorder} transition-all duration-200 group`}>
      <div className="flex items-start justify-between gap-3">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          <h4 className={`${THEME.descriptionText} font-semibold text-base mb-2 truncate`}>
            {transaction.description}
          </h4>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className={`flex items-center gap-1.5 ${THEME.metaText} text-sm`}>
              <User className={`w-3.5 h-3.5 ${THEME.metaIcon} flex-shrink-0`} />
              <span className="truncate">{transaction.person}</span>
            </div>
            <div className={`flex items-center gap-1.5 ${THEME.metaText} text-sm`}>
              <Calendar className={`w-3.5 h-3.5 ${THEME.metaIcon} flex-shrink-0`} />
              <span>{formatDate(transaction.date)}</span>
            </div>
          </div>
          
          {/* Category Badge - Mobile */}
          <div className="mt-2 sm:hidden">
            <span className={`inline-block ${THEME.badgeBg} ${THEME.badgeText} text-xs font-medium px-2.5 py-1 rounded-lg`}>
              {transaction.category}
            </span>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-start gap-2 flex-shrink-0">
          {/* Category Badge - Desktop */}
          <div className="hidden sm:block">
            <span className={`inline-block ${THEME.badgeBg} ${THEME.badgeText} text-xs font-medium px-2.5 py-1 rounded-lg`}>
              {transaction.category}
            </span>
          </div>
          
          {/* Amount */}
          <div className="text-right">
            <p className={`text-lg sm:text-xl font-bold ${isCredit ? THEME.creditAmount : THEME.debitAmount}`}>
              {isCredit ? '+' : '-'}Rs {transaction.amount.toLocaleString()}
            </p>
          </div>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(transaction.id)}
            className={`opacity-0 group-hover:opacity-100 transition-all p-2 ${THEME.deleteBtnHoverBg} rounded-lg`}
            aria-label="Delete transaction"
          >
            <Trash2 className={`w-4 h-4 ${THEME.deleteBtnIcon}`} />
          </button>
        </div>
      </div>
    </div>
  );
}