import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X, Smartphone, CheckCircle, ExternalLink } from 'lucide-react';

export default function IosInstallBanner() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if running as PWA standalone
    const standaloneCheck = 
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(standaloneCheck);

    // Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleIos = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isAppleIos);
  }, []);

  // If already opened in standalone mode, show subtle indicator or nothing
  if (isStandalone) {
    return (
      <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-3 py-1.5 flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Đang mở ở chế độ <b>PWA Standalone (App Mobile)</b></span>
        </div>
        <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-mono">No Safari Bar</span>
      </div>
    );
  }

  if (isDismissed) {
    return null;
  }

  return (
    <>
      {/* Banner on top of page */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-3.5 py-2.5 shadow-lg relative z-30">
        <div className="flex items-start justify-between gap-2 max-w-lg mx-auto">
          <div className="flex items-center gap-2.5 flex-1 cursor-pointer" onClick={() => setShowGuide(true)}>
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-xs flex items-center gap-1.5">
                <span>Cài App vào iPhone không cần App Store</span>
                <span className="bg-white text-orange-700 text-[10px] px-1.5 py-0.2 rounded font-black uppercase">PWA</span>
              </div>
              <p className="text-[11px] text-amber-100 line-clamp-1">
                Bấm vào đây để xem cách mở Full màn hình (ẩn thanh địa chỉ Safari)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowGuide(true)}
              className="text-xs bg-white text-orange-700 font-medium px-2.5 py-1 rounded-lg shadow-sm hover:bg-amber-50 active:scale-95 transition"
            >
              Xem ngay
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-white/70 hover:text-white rounded-md"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Guide */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto pb-safe">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  
                </div>
                <h3 className="font-bold text-base text-white">Hướng Dẫn Cài Vào iPhone (PWA Standalone)</h3>
              </div>
              <button 
                onClick={() => setShowGuide(false)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Website đã được tích hợp đầy đủ cấu hình <b>iOS Web Clip & Standalone Manifest</b>. Sau khi thêm vào màn hình chính, web sẽ chạy độc lập toàn màn hình như một ứng dụng Native (không còn thanh tìm kiếm URL của Safari).
            </p>

            <div className="space-y-3.5 my-4">
              <div className="flex items-start gap-3 bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                    Mở bằng trình duyệt <b>Safari</b> trên iPhone
                  </div>
                  <p className="text-slate-400">
                    Bấm vào biểu tượng <b>Chia sẻ (Share)</b> <Share className="w-3.5 h-3.5 inline text-blue-400 mx-0.5" /> ở thanh công cụ dưới đáy màn hình.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                    Chọn "Thêm vào MH chính" (Add to Home Screen)
                  </div>
                  <p className="text-slate-400">
                    Cuộn xuống danh sách tùy chọn và chọn <span className="inline-flex items-center gap-1 text-slate-200 font-medium bg-slate-700 px-1.5 py-0.5 rounded"><PlusSquare className="w-3 h-3 text-orange-400" /> Thêm vào MH chính</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  3
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-slate-100">
                    Nhấn "Thêm" (Add) ở góc trên bên phải
                  </div>
                  <p className="text-slate-400">
                    Biểu tượng <b>CamRent</b> sẽ xuất hiện ngoài màn hình chính của iPhone. Chạm vào biểu tượng để khởi chạy không viền trình duyệt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-[11px] text-amber-200/90 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>
                <b>Mẹo:</b> Khi máy chủ chạy ở mạng LAN (ví dụ <code>http://192.168.x.x:3000</code>), bạn chỉ cần gõ IP này vào Safari của iPhone là cài được ngay lập tức!
              </span>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-semibold text-white rounded-xl shadow-lg active:scale-98 transition text-sm"
            >
              Đã hiểu, đóng hướng dẫn
            </button>
          </div>
        </div>
      )}
    </>
  );
}

