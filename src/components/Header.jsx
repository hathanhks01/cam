import React from 'react';
import { Camera, Search, PhoneCall, ShieldCheck, Zap } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, selectedBrand, setSelectedBrand, brands }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 pt-safe">
      <div className="max-w-md mx-auto px-4 py-3">
        {/* Top brand row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Camera className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                  CamRent
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.2 rounded-full font-semibold">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Thuê máy ảnh & lens lấy liền</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block"></span>
                <span className="text-emerald-400 font-medium">Sẵn máy</span>
              </p>
            </div>
          </div>

          <a 
            href="tel:0988888888" 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-orange-400 border border-slate-700 rounded-full transition active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
            <span>0988.888.888</span>
          </a>
        </div>

        {/* Search Input */}
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm máy ảnh Sony A7 IV, FX3, Lens, Pocket 3..."
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Brand horizontal chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 text-xs">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`shrink-0 px-3 py-1 rounded-xl transition font-medium ${
                selectedBrand === b
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Trust pill bar */}
      <div className="bg-slate-950/60 border-t border-slate-800/60 px-4 py-1.5 text-[10px] text-slate-400 flex items-center justify-between overflow-x-auto no-scrollbar gap-3">
        <div className="flex items-center gap-1 shrink-0">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Giao máy nhanh 2H nội thành</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Chỉ giữ bản sao CCCD + cọc nhẹ</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Camera className="w-3 h-3 text-sky-400" />
          <span>Test máy kỹ trước khi giao</span>
        </div>
      </div>
    </header>
  );
}

