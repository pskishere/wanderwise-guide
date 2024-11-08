import { createApp } from '@tarojs/taro'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Check if we're in Taro environment
const isTaro = typeof process !== 'undefined' && process.env.TARO_ENV !== undefined

if (isTaro) {
  // For Taro environment
  createApp({
    entry: App,
    onLaunch() {
      console.log('App launched')
    },
  })
} else {
  // For web environment
  createRoot(document.getElementById('root')!).render(<App />)
}

export default App