import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App'

// checa por conteúdo novo ao abrir o app e ao voltar do segundo plano —
// sem isso, o navegador só rechecaria a cada ~24h e lições novas
// poderiam demorar a aparecer para quem já tem o PWA instalado
const updateSW = registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    registration?.update()
  },
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') updateSW()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
