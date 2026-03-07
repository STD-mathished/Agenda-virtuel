import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080', 
  realm: 'agendai-app',       
  clientId: 'agendai-app'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
