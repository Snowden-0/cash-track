export default function FolderCard({ icon, title, amount, count, onClick }) {
  const IconComponent = icon;
  
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl p-6 bg-gray-200 shadow-xl hover:border-gray-700 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`w-12 h-12 flex items-center justify-center mb-2 scale-150`}>
            <IconComponent className="w-6 h-6 text-black" />
          </div>
          
          <h3 className="text-black font-semibold text-xl mb-1">{title}</h3>
          
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-black">Rs {amount.toLocaleString()}</span>
          </div>
          
          <p className="text-gray-900 text-sm">{count} transactions</p>
        </div>
      </div>
    </div>
  );
}