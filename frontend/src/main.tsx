import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx';
import NotFound from './pages/notFound.tsx';
import Index from './pages/index.tsx';
import keycloak from './keycloak.ts';

keycloak.init({  
  onLoad: 'login-required', 
  checkLoginIframe: false 
}).then((authenticated) => {
  
  if (authenticated) {
    console.log("Utilisateur connecté ! Token:", keycloak.token);
  } else {
    console.log("Utilisateur non connecté.");
  }

  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/app' element={<App/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );

}).catch((error) => {
  console.error("Échec de l'initialisation de Keycloak", error);
});