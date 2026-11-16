import React from 'react';
import { Star, ShieldAlert, Check, Plus, ShoppingBag, Eye } from 'lucide-react';

export default function CameraCard({ item, onSelect, onAddToCart, isInCart }) {
  const formatVnd = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-lg hover:border-slate-600 transition flex flex-col group">
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelect(item)}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Badge Top Left */}
        {item.badge && (
          <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            {item.badge}
          </span>
        )}

        {/* Brand Tag Top Right */}
        <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-slate-200 font-semibold text-[10px] px-2 py-0.5 rounded-lg border border-white/10">
          {item.brand}
        </span>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-white">{item.rating}</span>
            <span className="text-slate-400">({item.reviewCount})</span>
          </div>

          <div className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sẵn máy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 
            onClick={() => onSelect(item)}
            className="font-bold text-sm text-white hover:text-orange-400 transition cursor-pointer line-clamp-1"
          >
            {item.name}
          </h3>

          {/* Quick bullet points */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.specs.slice(0, 2).map((spec, i) => (
              <span key={i} className="text-[10px] bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md border border-slate-600/40">
                {spec}
              </span>
            ))}
          </div>

          {/* Accessories preview */}
          <p className="text-[10px] text-slate-400 mt-2 line-clamp-1">
            <b className="text-slate-300 font-medium">Kèm sẵn:</b> {item.included.slice(0, 2).join(', ')}...
          </p>
        </div>

        {/* Pricing and Action row */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-700/50 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Giá thuê:</div>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-base text-orange-400">
                {formatVnd(item.pricePerDay)}
              </span>
              <span className="text-[10px] text-slate-400">/ngày</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Cọc: <span className="text-slate-300 font-medium">{formatVnd(item.deposit)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelect(item)}
              title="Xem chi tiết máy"
              className="p-2 bg-slate-700/70 hover:bg-slate-700 text-slate-200 rounded-xl active:scale-95 transition"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onAddToCart(item)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition ${
                isInCart
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-900/30'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã chọn</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thuê</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

