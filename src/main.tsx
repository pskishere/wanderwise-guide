import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Check if we're in Taro environment
const isTaro = typeof process !== 'undefined' && process.env.TARO_ENV !== undefined;

if (!isTaro) {
  // Only run this code in web environment
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

// Export App component for Taro
export default App