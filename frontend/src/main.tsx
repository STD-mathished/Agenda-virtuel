import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx';
import Taches from './pages/taches.tsx';
import NotFound from './pages/notFound.tsx';
import Index from './pages/index.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/app' element={<App/>}/>
      <Route path='/taches' element={<Taches/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>,
)
