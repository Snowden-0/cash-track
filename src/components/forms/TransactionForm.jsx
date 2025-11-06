import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

// Theme Constants - Easy to modify
const THEME = {
  // Form Card
  formBg: 'bg-white',
  formBorder: 'border-gray-100',
  formShadow: 'shadow-lg',
  
  // Labels
  labelText: 'text-gray-700',
  labelSize: 'text-sm',
  labelWeight: 'font-medium',
  
  // Input Fields
  inputBg: 'bg-gray-50',
  inputBorder: 'border-gray-200',
  inputText: 'text-gray-900',
  inputPlaceholder: 'placeholder-gray-400',
  inputFocusBorder: 'focus:border-gray-900',
  inputFocusRing: 'focus:ring-2 focus:ring-gray-900/10',
  
  // Button
  buttonBg: 'bg-gray-900',
  buttonHoverBg: 'hover:bg-gray-800',
  buttonText: 'text-white',
  
  // Back Button
  backButtonText: 'text-gray-600',
  backButtonHover: 'hover:text-gray-900',
  
  // Title
  titleText: 'text-gray-900',
  titleSize: 'text-2xl',
};

export default function TransactionForm({ onAdd, onBack }) {
  const [formData, setFormData] = useState({
    category: 'Money In',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    person: ''
  });

  const categories = [
    { value: 'Money In', type: 'credit' },
    { value: 'Money Out', type: 'debit' },
    { value: 'Loans', type: 'loan' },
    { value: 'Customers', type: 'customer' },
    { value: 'Suppliers', type: 'supplier' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || !formData.person) {
      alert('Please fill all required fields');
      return;
    }

    const category = categories.find(c => c.value === formData.category);
    
    onAdd({
      ...formData,
      amount: parseFloat(formData.amount),
      type: category.type,
      date: formData.date
    });

    setFormData({
      category: 'Money In',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      person: ''
    });

    alert('Transaction added successfully!');
    onBack();
  };

  const inputClass = `w-full ${THEME.inputBg} border ${THEME.inputBorder} rounded-xl px-4 py-3 ${THEME.inputText} ${THEME.inputPlaceholder} focus:outline-none ${THEME.inputFocusBorder} ${THEME.inputFocusRing} transition-all`;
  
  const labelClass = `block ${THEME.labelSize} ${THEME.labelWeight} ${THEME.labelText} mb-2`;

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={onBack}
        className={`flex items-center gap-2 ${THEME.backButtonText} ${THEME.backButtonHover} transition-colors mb-6`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className={`${THEME.formBg} rounded-2xl p-6 border ${THEME.formBorder} ${THEME.formShadow}`}>
        <h2 className={`${THEME.titleSize} font-bold ${THEME.titleText} mb-6`}>Add Transaction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Amount (Rs)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Person/Entity
            </label>
            <input
              type="text"
              value={formData.person}
              onChange={(e) => setFormData({ ...formData, person: e.target.value })}
              placeholder="Enter name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows="3"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${THEME.buttonBg} ${THEME.buttonHoverBg} ${THEME.buttonText} font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-6`}
          >
            <Save className="w-5 h-5" />
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}