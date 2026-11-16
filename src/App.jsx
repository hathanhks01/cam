import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import IosInstallBanner from './components/IosInstallBanner';
import CameraCard from './components/CameraCard';
import CameraDetailModal from './components/CameraDetailModal';
import CartDrawer from './components/CartDrawer';
import CombosView from './components/CombosView';
import GuideView from './components/GuideView';
import BottomNav from './components/BottomNav';
import { CAMERAS, CATEGORIES, BRANDS } from './data/cameras';
import { SlidersHorizontal, Camera, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'combos' | 'cart' | 'guide'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc'

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (camera) => {
    if (cart.find((item) => item.id === camera.id)) {
      setCart(cart.filter((item) => item.id !== camera.id));
      showToast(`Đã bỏ ${camera.name} khỏi giỏ thuê`);
    } else {
      setCart([...cart, camera]);
      showToast(`Đã thêm ${camera.name} vào giỏ thuê`);
    }
  };

  const handleSelectCombo = (combo) => {
    // Add combo as custom camera item to cart
    const comboItem = {
      id: combo.id,
      name: combo.title,
      brand: 'Combo',
      category: 'combo',
      pricePerDay: combo.price,
      deposit: 2000000,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      specs: combo.items,
      included: combo.items,
      description: combo.description
    };
    if (!cart.find(c => c.id === combo.id)) {
      setCart([...cart, comboItem]);
    }
    showToast(`Đã thêm ${combo.title} vào đơn thuê!`);
    setActiveTab('cart');
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered and Sorted Cameras
  const filteredCameras = useMemo(() => {
    let list = CAMERAS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchBrand = selectedBrand === 'Tất cả' || item.brand === selectedBrand;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchBrand && matchSearch;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white pb-16">
      {/* iOS Standalone Install Guide Banner */}
      <IosInstallBanner />

      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        brands={BRANDS}
      />

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-orange-500 text-white text-xs px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area based on Tab */}
      <main className="flex-1 max-w-md mx-auto w-full">
        {activeTab === 'explore' && (
          <div className="px-4 py-3 space-y-3">
            {/* Category horizontal pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-2xl font-semibold shrink-0 transition ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort & Counter bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
              <span>
                Tìm thấy <b className="text-white font-semibold">{filteredCameras.length}</b> thiết bị
              </span>

              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-2 py-1 focus:outline-none focus:border-orange-500"
                >
                  <option value="featured">Phổ biến nhất</option>
                  <option value="price-asc">Giá: Thấp → Cao</option>
                  <option value="price-desc">Giá: Cao → Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Grid of Cameras */}
            {filteredCameras.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
                  <Camera className="w-8 h-8" />
                </div>
                <p className="text-sm text-slate-400">Không tìm thấy thiết bị phù hợp</p>
                <button
                  onClick={() => {
                    setSelectedBrand('Tất cả');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-orange-400 underline font-medium"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-6">
                {filteredCameras.map((camera) => (
                  <CameraCard
                    key={camera.id}
                    item={camera}
                    onSelect={setSelectedCamera}
                    onAddToCart={handleAddToCart}
                    isInCart={cart.some((c) => c.id === camera.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'combos' && (
          <CombosView onSelectCombo={handleSelectCombo} />
        )}

        {activeTab === 'cart' && (
          <CartDrawer
            cartItems={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onExploreMore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'guide' && (
          <GuideView />
        )}
      </main>

      {/* Camera Detail Modal / Bottom Sheet */}
      {selectedCamera && (
        <CameraDetailModal
          item={selectedCamera}
          onClose={() => setSelectedCamera(null)}
          onAddToCart={handleAddToCart}
          isInCart={cart.some((c) => c.id === selectedCamera.id)}
        />
      )}

      {/* Floating Bottom Tab Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.length}
      />
    </div>
  );
}

