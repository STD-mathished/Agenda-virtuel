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
        className="
          bg-red-600 text-white 
          px-5 py-2 
          rounded font-medium 
          transition-all duration-300 
          hover:bg-red-700 hover:scale-105
          active:scale-95
        "
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;