import React from 'react';
import { Compass, Layers, ShoppingBag, Smartphone } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, cartCount }) {
  const tabs = [
    { id: 'explore', label: 'Khám phá', icon: Compass },
    { id: 'combos', label: 'Gói Combo', icon: Layers },
    { id: 'cart', label: 'Đơn thuê', icon: ShoppingBag, badge: cartCount },
    { id: 'guide', label: 'Cài App & HD', icon: Smartphone },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 pb-safe">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition relative ${
                isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-orange-400 absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

