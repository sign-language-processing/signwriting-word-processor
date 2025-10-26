import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Load SignWriting web components from CDN
const script = document.createElement('script')
script.type = 'module'
script.src = 'https://unpkg.com/@sutton-signwriting/sgnw-components@1.1.0/dist/sgnw-components/sgnw-components.esm.js'
document.head.appendChild(script)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
