import React, { useState } from 'react';
import { Trash2, Calendar, ShieldCheck, CheckCircle2, QrCode, Phone, MapPin, Sparkles, ArrowRight, X } from 'lucide-react';

export default function CartDrawer({ cartItems, onRemoveFromCart, onClearCart, onExploreMore }) {
  // Dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  // Customer Form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('store'); // 'store' | 'delivery'
  const [address, setAddress] = useState('');
  const [idType, setIdType] = useState('cccd'); // 'cccd' | 'deposit'
  const [note, setNote] = useState('');

  // Booking result modal
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const formatVnd = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Calculate rental days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(end - start, 86400000); // minimum 1 day
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calculations
  const dailyTotal = cartItems.reduce((acc, item) => acc + item.pricePerDay, 0);
  const baseRentalCost = dailyTotal * rentalDays;
  const discountAmount = rentalDays >= 3 ? Math.round(baseRentalCost * 0.1) : 0;
  const finalRentalCost = baseRentalCost - discountAmount;
  const totalDeposit = cartItems.reduce((acc, item) => acc + item.deposit, 0);

  const handleBooking = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!fullName.trim() || !phone.trim()) {
      alert('Vui lòng điền họ tên và số điện thoại để đặt thuê máy!');
      return;
    }

    const orderId = 'CAM-' + Math.floor(100000 + Math.random() * 900000);
    setBookingSuccess({
      orderId,
      fullName,
      phone,
      startDate,
      endDate,
      rentalDays,
      finalRentalCost,
      totalDeposit,
      deliveryType,
      items: [...cartItems]
    });
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-6 space-y-5 animate-in fade-in">
        <div className="bg-slate-800/90 border border-emerald-500/40 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Đặt thuê thành công
          </span>

          <h2 className="text-xl font-extrabold text-white mt-2">Mã đơn: #{bookingSuccess.orderId}</h2>
          <p className="text-xs text-slate-300 mt-1">
            CamRent đã nhận thông tin đặt thuê của bạn. Nhân viên CSKH sẽ gọi xác nhận trong 5 phút!
          </p>

          {/* QR code mock for store pickup */}
          <div className="my-5 p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
            <div className="w-40 h-40 bg-slate-100 flex flex-col items-center justify-center text-slate-900 border-2 border-dashed border-slate-300 rounded-xl relative">
              <QrCode className="w-28 h-28 text-slate-900" />
              <span className="text-[9px] font-mono text-slate-600 mt-1">MÃ NHẬN MÁY TẠI QUẦY</span>
            </div>
          </div>

          {/* Details summary */}
          <div className="bg-slate-900/80 rounded-2xl p-4 text-xs text-left space-y-2 border border-slate-700/60">
            <div className="flex justify-between text-slate-400">
              <span>Khách hàng:</span>
              <span className="text-slate-100 font-semibold">{bookingSuccess.fullName} ({bookingSuccess.phone})</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Thời gian thuê:</span>
              <span className="text-slate-100 font-medium">
                {bookingSuccess.startDate} → {bookingSuccess.endDate} ({bookingSuccess.rentalDays} ngày)
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Hình thức nhận:</span>
              <span className="text-orange-400 font-medium">
                {bookingSuccess.deliveryType === 'store' ? 'Nhận tại cửa hàng' : 'Giao máy tận nơi'}
              </span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
              <span>Tổng tiền thuê:</span>
              <span className="text-orange-400">{formatVnd(bookingSuccess.finalRentalCost)}</span>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => {
                setBookingSuccess(null);
                onClearCart();
                onExploreMore();
              }}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl text-xs active:scale-98 transition shadow-lg shadow-orange-500/30"
            >
              Hoàn tất & Tiếp tục khám phá
            </button>
            <a
              href="tel:0988888888"
              className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-2xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>Gọi hotline hỗ trợ ngay: 0988.888.888</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-500 border border-slate-700/60 shadow-inner">
          <Calendar className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Giỏ thiết bị đang trống</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Bạn chưa chọn thiết bị nào. Hãy lướt danh sách máy ảnh, ống kính và bấm "Thuê" để lập đơn đặt máy nhé!
          </p>
        </div>
        <button
          onClick={onExploreMore}
          className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition"
        >
          Khám phá danh sách máy
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Đơn Thuê Thiết Bị</span>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">
              {cartItems.length} món
            </span>
          </h2>
          <p className="text-xs text-slate-400">Chọn ngày thuê và điền thông tin để giữ máy</p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-slate-400 hover:text-red-400 transition"
        >
          Xóa tất cả
        </button>
      </div>

      {/* Date Picker Box */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 space-y-3">
        <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 text-orange-400">
          <Calendar className="w-4 h-4" />
          <span>Thời gian thuê thiết bị ({rentalDays} ngày)</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Ngày nhận máy:</label>
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (new Date(e.target.value) >= new Date(endDate)) {
                  const nextDay = new Date(e.target.value);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setEndDate(nextDay.toISOString().split('T')[0]);
                }
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Ngày trả máy:</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {rentalDays >= 3 ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-[11px] text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ưu đãi thuê dài ngày ({rentalDays} ngày): <b>Giảm 10%</b> tiền thuê!</span>
          </div>
        ) : (
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <span>💡 Thuê từ 3 ngày trở lên để được tự động giảm thêm 10%.</span>
          </div>
        )}
      </div>

      {/* Selected Items List */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-300">Danh sách máy & lens đã chọn:</div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-2.5 flex items-center gap-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs text-white truncate">{item.name}</h4>
              <p className="text-[11px] text-orange-400 font-medium mt-0.5">
                {formatVnd(item.pricePerDay)}/ngày
              </p>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <span>Cọc: {formatVnd(item.deposit)}</span>
              </div>
            </div>
            <button
              onClick={() => onRemoveFromCart(item.id)}
              className="p-2 text-slate-400 hover:text-red-400 transition"
              title="Xóa món này"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Customer Info Form */}
      <form onSubmit={handleBooking} className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 space-y-3">
        <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider text-orange-400">
          Thông tin người nhận máy
        </div>

        <div>
          <label className="text-[11px] text-slate-300 block mb-1">
            Họ và tên <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-[11px] text-slate-300 block mb-1">
            Số điện thoại (Zalo) <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 0912345678"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Delivery Type */}
        <div>
          <label className="text-[11px] text-slate-300 block mb-1.5">Hình thức nhận máy:</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDeliveryType('store')}
              className={`p-2 rounded-xl border text-center transition ${
                deliveryType === 'store'
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400 font-semibold'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              Nhận tại cửa hàng
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType('delivery')}
              className={`p-2 rounded-xl border text-center transition ${
                deliveryType === 'delivery'
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400 font-semibold'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              Giao máy tận nơi
            </button>
          </div>
        </div>

        {deliveryType === 'delivery' && (
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">Địa chỉ giao máy:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, tên đường, quận/huyện..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        )}

        {/* Deposit Assurance */}
        <div>
          <label className="text-[11px] text-slate-300 block mb-1.5">Hình thức bảo đảm cọc:</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIdType('cccd')}
              className={`p-2 rounded-xl border text-center transition ${
                idType === 'cccd'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              CCCD gắn chip (Chụp đối chiếu)
            </button>
            <button
              type="button"
              onClick={() => setIdType('deposit')}
              className={`p-2 rounded-xl border text-center transition ${
                idType === 'deposit'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              Đặt cọc tiền mặt / CK
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] text-slate-300 block mb-1">Ghi chú thêm (tùy chọn):</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Cần thêm filter, chân máy tripod, hoặc setup sẵn lens..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Cost Summary */}
        <div className="bg-slate-900/90 rounded-xl p-3.5 space-y-1.5 border border-slate-800 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Tiền thuê ({rentalDays} ngày):</span>
            <span className="text-slate-200">{formatVnd(baseRentalCost)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Ưu đãi thuê dài ngày:</span>
              <span>-{formatVnd(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-400">
            <span>Phí vệ sinh & phụ kiện:</span>
            <span className="text-emerald-400 font-medium">Miễn phí 0đ</span>
          </div>

          <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline">
            <span className="font-bold text-slate-100">Tổng tiền thanh toán:</span>
            <span className="text-lg font-black text-orange-400">{formatVnd(finalRentalCost)}</span>
          </div>

          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 flex justify-between">
            <span>Cọc thiết bị ước tính:</span>
            <span className="text-slate-300 font-medium">{formatVnd(totalDeposit)} (Hoàn lại 100%)</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-98 transition"
        >
          <span>Xác nhận đặt thuê ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

