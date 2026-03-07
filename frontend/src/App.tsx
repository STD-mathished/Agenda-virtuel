import { useEffect, useState } from 'react';
import './App.css';
import HeaderApp from './components/header-app';
import keycloak from './keycloak.ts';
import type { KeycloakProfile } from 'keycloak-js';
import LogoutButton from './components/button/logout-btn.tsx';
import type { ExtendedUserInfo } from './types/extended-user-info.ts';




export default function App() {

 const [userInfo,setUserInfo] = useState<ExtendedUserInfo | null>(null)

useEffect(() => {
    console.log("App initialisation, keycloak instance:", keycloak);
    keycloak.loadUserInfo().then((user) => {
      console.log("User info fetched:", user);
      setUserInfo(user as KeycloakProfile);
    }).catch(err => {
      console.error("Erreur lors du chargement des infos utilisateur", err);
    });
  }, []); 

  return(
    <>
      <HeaderApp userInfo={userInfo}/>

      <LogoutButton/>
    </>
    
  )
}
