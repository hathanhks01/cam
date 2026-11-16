import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Register service worker if supported
if ('serviceWorker' in navigator && !window.location.host.includes('localhost') && window.location.protocol === 'https:') {
  // PWA workbox handles auto-register via vite-plugin-pwa
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

