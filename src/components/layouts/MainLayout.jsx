import Header from '../common/Header';
import BottomNav from '../common/BottomNav';

export default function MainLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className='bg-gray-100'>
      {/* <Header /> */}
      
      <main className="relative z-10 pt-6 px-4 pb-24 ">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}