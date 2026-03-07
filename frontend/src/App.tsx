import { useEffect, useState } from 'react';
import './App.css';
import HeaderApp from './components/header-app';
import keycloak from './keycloak.ts';
import type { KeycloakProfile } from 'keycloak-js';
import type { ExtendedUserInfo } from './types/extended-user-info.ts';
import FooterApp from './components/footer-app.tsx';
import { Calendar } from './components/ui/calendar.tsx';




export default function App() {

const [userInfo,setUserInfo] = useState<ExtendedUserInfo | null>(null);
const [date, setDate] = useState<Date | undefined>(new Date());
 
// quand le composant est monté
useEffect(() => {
    console.log("App initialisation, keycloak instance:", keycloak);
    keycloak.loadUserInfo().then((user) => {
      console.log("User info fetched:", user);
      setUserInfo(user as KeycloakProfile);
    }).catch(err => {
      console.error("Erreur lors du chargement des infos utilisateur", err);
    });
  }, []); 

//quand la date change
useEffect( ()=> {
  alert(date)
},[date])

  return(
    <>
      <HeaderApp userInfo={userInfo}/>

      <main className='ml-10 mr-10'>
        {/* Calendrier */}
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='border'
        />
      </main>
      <FooterApp/>
    </>
    
  )
}
