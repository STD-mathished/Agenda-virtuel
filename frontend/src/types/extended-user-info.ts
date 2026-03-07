import type { KeycloakProfile } from 'keycloak-js';

interface ExtendedUserInfo extends KeycloakProfile {
    name?: string;
    preferred_username?: string;
}

export type { ExtendedUserInfo };