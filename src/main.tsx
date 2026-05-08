import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initTheme } from './store/use-theme-store.ts'

// Apply saved theme before first render to prevent flash
initTheme()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root tidak ditemukan di DOM')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
