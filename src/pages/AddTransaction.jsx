import TransactionForm from '../components/forms/TransactionForm';

export default function AddTransaction({ onAdd, onBack }) {
  return <TransactionForm onAdd={onAdd} onBack={onBack} />;
}