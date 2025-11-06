import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function QuickStats({ totalIn, totalOut }) {
  const balance = totalIn - totalOut;
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {/* Balance Card - Left Side */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-gray-200 text-m font-medium mb-1 tracking-wide uppercase">Balance</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white tracking-tight">
              Rs {balance.toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* In/Out Cards - Right Side Stacked */}
        <div className="flex flex-col gap-2">
          {/* Total In Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-700 scale-150" />
              </div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Money In</p>
            <p className="text-xl font-bold text-gray-900">Rs {totalIn.toLocaleString()}</p>
          </div>
          
          {/* Total Out Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-700 scale-150" />
              </div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Money Out</p>
            <p className="text-xl font-bold text-gray-900">Rs {totalOut.toLocaleString()}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}