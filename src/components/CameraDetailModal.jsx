import React from 'react';
import { X, Check, ShieldCheck, Zap, Package, Star, Calendar, FileText, ArrowRight } from 'lucide-react';

export default function CameraDetailModal({ item, onClose, onAddToCart, isInCart }) {
  if (!item) return null;

  const formatVnd = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl pb-safe"
      >
        {/* Top Header */}
        <div className="relative aspect-[16/10] w-full bg-slate-950 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/20 active:scale-90 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-orange-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md uppercase">
              {item.brand}
            </span>
            {item.badge && (
              <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                {item.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold">{item.rating}</span>
              <span className="text-slate-300">({item.reviewCount} đánh giá tích cực)</span>
            </div>
            <div className="text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Đang có sẵn máy</span>
            </div>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{item.name}</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
          </div>

          {/* Pricing Highlight Box */}
          <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <div className="text-xs text-orange-400 font-medium">Giá thuê tính theo 24H:</div>
              <div className="text-2xl font-black text-orange-400">
                {formatVnd(item.pricePerDay)}
                <span className="text-xs font-normal text-slate-400">/ngày</span>
              </div>
              <div className="text-[11px] text-amber-200/90 mt-0.5">
                🔥 Thuê từ 3 ngày giảm ngay 10%
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400">Tiền cọc thiết bị:</div>
              <div className="text-base font-bold text-slate-200">{formatVnd(item.deposit)}</div>
              <div className="text-[10px] text-emerald-400 font-medium">Hoặc CCCD + Giấy tờ xe</div>
            </div>
          </div>

          {/* Included Accessories */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5">
            <h4 className="font-bold text-xs text-slate-200 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-orange-400">
              <Package className="w-4 h-4" />
              Phụ kiện đi kèm miễn phí trong gói
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {item.included.map((inc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300 bg-slate-900/60 px-2.5 py-1.5 rounded-xl border border-slate-800">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5">
            <h4 className="font-bold text-xs text-slate-200 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-sky-400">
              <Zap className="w-4 h-4" />
              Thông số kỹ thuật nổi bật
            </h4>
            <div className="space-y-1.5">
              {item.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rental Policy */}
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-3.5 text-xs space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Thủ tục nhận máy cực kỳ đơn giản:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
              <li>Khách hàng cung cấp CCCD gắn chip (đối chiếu tại chỗ hoặc chụp 2 mặt).</li>
              <li>Kiểm tra sensor, ngoại hình máy và ký biên nhận bàn giao thiết bị.</li>
              <li>Hỗ trợ hướng dẫn setup thông số máy ảnh miễn phí cho người mới bắt đầu.</li>
            </ul>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={() => {
              onAddToCart(item);
              onClose();
            }}
            className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-98 ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-900/40'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã có trong giỏ hàng (Xem giỏ)</span>
              </>
            ) : (
              <>
                <span>Thêm vào giỏ thuê ngay</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

