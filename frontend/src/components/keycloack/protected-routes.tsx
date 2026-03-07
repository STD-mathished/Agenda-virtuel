import { useKeycloak } from "@react-keycloak/web";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Chargement...</div>;
  }

  if (!keycloak.authenticated) {
    keycloak.login();
    return <div>Redirection vers la page de connexion...</div>;
  }

  return children;
};

export default ProtectedRoute;