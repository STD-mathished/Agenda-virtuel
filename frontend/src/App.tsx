import { useEffect, useState } from 'react';
import './App.css';
import HeaderApp from './components/header-app';
import keycloak from './keycloak.ts';
import type { KeycloakProfile } from 'keycloak-js';
import type { ExtendedUserInfo } from './types/extended-user-info.ts';
import FooterApp from './components/footer-app.tsx';
import { Calendar } from './components/ui/calendar.tsx';
import MenuOrganisation from './components/menu/menu-orga.tsx';




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
  console.log(date)
},[date])

  return(
    <>
      <HeaderApp userInfo={userInfo}/>

      <main className='flex gap-2  ml-10 mr-10 mb-20'>
        {/* Calendrier */}
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='border flex-1/2'
        />

        {/* Menu d'organisation */}
        <div className='flex-1/2'>
          <MenuOrganisation/>
        </div>
      </main>
      <FooterApp/>
    </>
    
  )
}
