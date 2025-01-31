import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ChefState from './state/ChefState.tsx'
import ChefInfoState from './state/ChefInfoState.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChefState>
      <ChefInfoState>
          <BrowserRouter>
          <App />
          </BrowserRouter>
      </ChefInfoState>
      </ChefState>
  </StrictMode>,
)
