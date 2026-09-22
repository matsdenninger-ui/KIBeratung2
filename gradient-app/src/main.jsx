import { createRoot } from 'react-dom/client'
import HeroGradient from './HeroGradient.jsx'

function mountAll() {
  document.querySelectorAll('[data-shader-gradient]').forEach((el) => {
    if (el.dataset.shaderGradientMounted) return
    el.dataset.shaderGradientMounted = 'true'
    createRoot(el).render(<HeroGradient />)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAll)
} else {
  mountAll()
}
