export default function Header() {
  return (
    <header className="relative z-10 px-6 pt-8 pb-6 bg-gray-900 border-b border-gray-800">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Finance Tracker
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your finances efficiently</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-xl font-bold">M</span>
          </div>
        </div>
      </div>
    </header>
  );
}