import { useKeycloak } from '@react-keycloak/web';

const LogoutButton = () => {
  const { keycloak } = useKeycloak();

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin 
    });
  };

  return (
    <button 
      onClick={handleLogout}
      style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer'}}
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;