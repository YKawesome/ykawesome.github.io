import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AchievementsProvider } from './context/AchievementsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AchievementsProvider>
      <App />
    </AchievementsProvider>
  </StrictMode>,
)
