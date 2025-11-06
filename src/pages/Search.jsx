import { useState } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import TransactionCard from '../components/cards/TransactionCard';

// Theme Constants - Easy to modify
const THEME = {
  // Page
  pageTitle: 'text-gray-900',
  pageSubtitle: 'text-gray-500',
  
  // Search Input
  searchBg: 'bg-white',
  searchBorder: 'border-gray-200',
  searchText: 'text-gray-900',
  searchPlaceholder: 'placeholder-gray-400',
  searchFocusBorder: 'focus:border-gray-900',
  searchFocusRing: 'focus:ring-2 focus:ring-gray-900/10',
  searchIcon: 'text-gray-400',
  
  // Filter Section
  filterCardBg: 'bg-white',
  filterCardBorder: 'border-gray-100',
  filterCardShadow: 'shadow-sm',
  filterIcon: 'text-gray-600',
  filterLabel: 'text-gray-600',
  
  // Filter Buttons
  filterBtnActive: 'bg-gray-900',
  filterBtnActiveText: 'text-white',
  filterBtnInactive: 'bg-gray-100',
  filterBtnInactiveText: 'text-gray-600',
  filterBtnHover: 'hover:bg-gray-200',
  
  // Results
  resultsText: 'text-gray-500',
  
  // Empty State
  emptyStateBg: 'bg-gray-50',
  emptyStateBorder: 'border-gray-100',
  emptyStateIcon: 'text-gray-300',
  emptyStateText: 'text-gray-600',
  emptyStateSubtext: 'text-gray-400',
};

export default function Search({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Money In', 'Money Out', 'Loans', 'Customers', 'Suppliers'];

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.person.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${THEME.pageTitle} mb-1`}>Search</h2>
        <p className={`text-sm ${THEME.pageSubtitle}`}>Find your transactions</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <SearchIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${THEME.searchIcon}`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by description or person..."
          className={`w-full ${THEME.searchBg} border ${THEME.searchBorder} rounded-xl pl-12 pr-4 py-3.5 ${THEME.searchText} ${THEME.searchPlaceholder} focus:outline-none ${THEME.searchFocusBorder} ${THEME.searchFocusRing} transition-all`}
        />
      </div>

      {/* Category Filter */}
      <div className={`${THEME.filterCardBg} rounded-2xl p-5 border ${THEME.filterCardBorder} ${THEME.filterCardShadow}`}>
        <div className="flex items-center gap-2 mb-4">
          <Filter className={`w-4 h-4 ${THEME.filterIcon}`} />
          <span className={`text-sm font-medium ${THEME.filterLabel}`}>Filter by Category</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filterCategory === cat
                  ? `${THEME.filterBtnActive} ${THEME.filterBtnActiveText}`
                  : `${THEME.filterBtnInactive} ${THEME.filterBtnInactiveText} ${THEME.filterBtnHover}`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        <p className={`${THEME.resultsText} text-sm font-medium mb-4`}>
          {filteredTransactions.length} result{filteredTransactions.length !== 1 ? 's' : ''}
        </p>
        
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={() => {}}
              />
            ))
          ) : (
            <div className={`${THEME.emptyStateBg} rounded-2xl p-8 border ${THEME.emptyStateBorder} text-center`}>
              <SearchIcon className={`w-12 h-12 ${THEME.emptyStateIcon} mx-auto mb-3`} />
              <p className={`${THEME.emptyStateText} font-medium`}>No transactions found</p>
              <p className={`${THEME.emptyStateSubtext} text-sm mt-1`}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}