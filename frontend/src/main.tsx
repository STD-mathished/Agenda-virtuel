import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx';
import Taches from './pages/taches.tsx';
import AjouterTache from './pages/ajouterTache.tsx';
import NotFound from './pages/notFound.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/taches' element={<Taches/>}/>
      <Route path='/ajouter' element={<AjouterTache/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>,
)
