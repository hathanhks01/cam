import React, { useState, useEffect } from 'react';
import { Smartphone, Share, PlusSquare, ShieldCheck, MapPin, Phone, HelpCircle, CheckCircle, ExternalLink, QrCode } from 'lucide-react';

export default function GuideView() {
  const [currentIp, setCurrentIp] = useState(window.location.hostname);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standaloneCheck = 
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsStandalone(standaloneCheck);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* PWA iPhone Standalone Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/40 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Cài Web Thành App Trên iPhone</h3>
            <p className="text-[11px] text-orange-400 font-medium">PWA Standalone - Ẩn thanh địa chỉ Safari</p>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 my-3 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span>Trạng thái hiển thị hiện tại:</span>
            {isStandalone ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
                <CheckCircle className="w-3 h-3" /> Standalone (App)
              </span>
            ) : (
              <span className="text-amber-400 font-medium flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded-full text-[10px]">
                Trình duyệt Web Safari
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400">
            Địa chỉ test mạng LAN: <code className="text-orange-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">{window.location.origin}</code>
          </div>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              1
            </span>
            <div className="text-slate-300">
              Mở liên kết web này bằng <b>Safari trên iPhone</b> (cùng mạng WiFi với máy tính).
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              2
            </span>
            <div className="text-slate-300">
              Nhấn nút <b>Chia sẻ (Share)</b> <Share className="w-3 h-3 inline text-blue-400 mx-0.5" /> ở thanh điều hướng dưới đáy Safari.
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              3
            </span>
            <div className="text-slate-300">
              Cuộn tìm và chọn <span className="text-white font-medium bg-slate-800 px-1 py-0.5 rounded">Thêm vào MH chính (Add to Home Screen)</span> rồi nhấn <b>Thêm</b>.
            </div>
          </div>
        </div>
      </div>

      {/* Procedures */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-4 shadow-xl space-y-3">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Thủ Tục & Quy Trình Thuê Máy Ảnh</span>
        </h3>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <div className="font-bold text-orange-400">1. Giấy tờ & Cọc linh hoạt</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Khách có CCCD gắn chip chính chủ chỉ cần chụp hình xác thực trên app VNeID và ký hợp đồng thuê máy. Không cần cọc 100% giá trị thiết bị.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <div className="font-bold text-orange-400">2. Kiểm tra thiết bị trước khi nhận</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bạn được test sensor máy, thấu kính lens, chống rung và lấy nét thoải mái trước khi nhận. Đầy đủ túi chống sốc, sạc đôi và thẻ nhớ tốc độ cao.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <div className="font-bold text-orange-400">3. Thời gian tính thuê 24h</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tính tròn 24 tiếng kể từ khi nhận máy. Nhận máy lúc 9h sáng hôm nay, trả máy trước 9h sáng hôm sau tính là 1 ngày thuê.
            </p>
          </div>
        </div>
      </div>

      {/* Store Location */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-4 shadow-xl space-y-3">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-400" />
          <span>Địa Chỉ & Hotline Cửa Hàng</span>
        </h3>

        <div className="text-xs text-slate-300 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Chi nhánh trung tâm:</div>
              <p className="text-slate-400">120 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-white">Hotline kỹ thuật 24/7:</div>
              <a href="tel:0988888888" className="text-orange-400 font-mono font-bold">0988.888.888</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

