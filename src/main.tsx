import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {registerSW} from "virtual:pwa-register";
import './index.css'
import App from './App.tsx'

if ("serviceWorker" in navigator) {
  registerSW()
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)