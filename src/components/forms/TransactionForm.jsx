import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import FormInput from './FormInput';
import SuccessMessage from './SuccessMessage'; // <-- Import the new component

// Theme Constants (can remain the same)
const THEME = {
  formBg: 'bg-white',
  formBorder: 'border-gray-100',
  formShadow: 'shadow-lg',
  buttonBg: 'bg-gray-900',
  buttonHoverBg: 'hover:bg-gray-800',
  buttonText: 'text-white',
  backButtonText: 'text-gray-600',
  backButtonHover: 'hover:text-gray-900',
  titleText: 'text-gray-900',
  titleSize: 'text-2xl',
};

export default function TransactionForm({ onAdd, onBack }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      category: 'Money In',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      person: ''
    }
  });

  // State for controlling the success message visibility
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { value: 'Money In', type: 'credit' },
    { value: 'Money Out', type: 'debit' },
    { value: 'Loans', type: 'loan' },
    { value: 'Customers', type: 'customer' },
    { value: 'Suppliers', type: 'supplier' }
  ];

  const onSubmit = (data) => {
    const category = categories.find(c => c.value === data.category);
    
    onAdd({
      ...data,
      amount: parseFloat(data.amount),
      type: category.type,
    });

    reset();
    setShowSuccess(true); // <-- Show the success message

    // Optional: Call onBack after a short delay to let user see the message
    setTimeout(() => {
        onBack();
    }, 1500);
  };

  return (
    <>
      <SuccessMessage
        show={showSuccess}
        message="Transaction Saved!"
        onHide={() => setShowSuccess(false)}
      />
      
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
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* FormInput fields remain unchanged... */}
            <FormInput
              name="category"
              label="Category"
              register={register}
              errors={errors}
              type="select"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.value}
                </option>
              ))}
            </FormInput>

            <FormInput
              name="amount"
              label="Amount (Rs)"
              register={register}
              errors={errors}
              type="number"
              placeholder="0.00"
              rules={{
                required: 'Amount is required',
                valueAsNumber: true,
                min: { value: 0.01, message: 'Amount must be greater than 0' }
              }}
            />

            <FormInput
              name="person"
              label="Person/Entity"
              register={register}
              errors={errors}
              placeholder="Enter name"
              rules={{
                required: 'Person or entity is required',
                minLength: { value: 3, message: 'Must be at least 3 characters' }
              }}
            />

            <FormInput
              name="description"
              label="Description"
              register={register}
              errors={errors}
              type="textarea"
              placeholder="Enter description"
              rules={{
                required: 'Description is required',
                maxLength: { value: 100, message: 'Cannot exceed 100 characters' }
              }}
            />

            <FormInput
              name="date"
              label="Date"
              register={register}
              errors={errors}
              type="date"
              rules={{
                required: 'Date is required',
                validate: value => new Date(value) <= new Date() || "Date cannot be in the future"
              }}
            />

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
    </>
  );
}