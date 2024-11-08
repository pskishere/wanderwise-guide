import { createReactApp } from '@tarojs/runtime'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Check if we're in Taro environment
const isTaro = typeof process !== 'undefined' && process.env.TARO_ENV !== undefined

if (isTaro) {
  // For Taro environment
  createReactApp({
    mount({ dom, component, props }) {
      createRoot(dom).render(component(props))
    },
    App,
  })
} else {
  // For web environment
  createRoot(document.getElementById('root')!).render(<App />)
}

export default App