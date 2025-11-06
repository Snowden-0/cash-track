import { Home, BarChart3, PlusCircle, Search, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'add', icon: PlusCircle, label: 'Add', special: true },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-200 rounded-4xl border-t border-gray-900 z-50 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          if (tab.special) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative -mt-8"
              >
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-900 transition-colors duration-300">
                  <tab.icon className="w-8 h-8 text-white" />
                </div>
              </button>
            );
          }
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300"
            >
              <tab.icon 
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                }`} 
              />
              <span className={`text-xs transition-colors duration-300 ${
                isActive ? 'text-gray-900 font-bold' : 'text-gray-600'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-gray-900" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
