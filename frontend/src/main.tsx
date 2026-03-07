import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx';
import NotFound from './pages/notFound.tsx';
import Index from './pages/index.tsx';
import keycloak from './keycloak.ts';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import ProtectedRoute from './components/keycloack/protected-routes.tsx';


  createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider 
      authClient={keycloak}
      initOptions={{onLoad:'check-sso', checkLoginIframe: false }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/app' element={
            <ProtectedRoute>
              <App/>
            </ProtectedRoute>}
          />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
