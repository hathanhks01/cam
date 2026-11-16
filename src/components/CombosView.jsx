import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { POPULAR_COMBOS } from '../data/cameras';

export default function CombosView({ onSelectCombo }) {
  const formatVnd = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Gói thiết bị tối ưu chi phí</span>
        </div>
        <h2 className="text-xl font-black text-white mt-1">Gói Combo Quay Chụp Trọn Gói</h2>
        <p className="text-xs text-slate-300 mt-1">
          Được các đạo diễn hình ảnh và photographer phối sẵn chuẩn chỉ, không lo thiếu phụ kiện hay pin sạc.
        </p>
      </div>

      <div className="space-y-4">
        {POPULAR_COMBOS.map((combo) => (
          <div
            key={combo.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-4 shadow-xl hover:border-orange-500/50 transition relative overflow-hidden"
          >
            {/* Discount Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white font-black text-[11px] px-3 py-1 rounded-bl-2xl shadow-md">
              TIẾT KIỆM {combo.discount}
            </div>

            <h3 className="font-extrabold text-base text-white pr-20">{combo.title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{combo.description}</p>

            <div className="my-3 bg-slate-900/70 rounded-2xl p-3 border border-slate-700/50 space-y-1.5">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trọn bộ bao gồm:</div>
              {combo.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 line-through">
                  Giá gốc: {formatVnd(combo.originalPrice)}
                </div>
                <div className="text-xl font-black text-orange-400">
                  {formatVnd(combo.price)}
                  <span className="text-xs text-slate-400 font-normal">/ngày</span>
                </div>
              </div>

              <button
                onClick={() => onSelectCombo(combo)}
                className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition flex items-center gap-1.5"
              >
                <span>Thuê Combo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

