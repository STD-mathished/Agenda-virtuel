import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from uuid import UUID

# Configuration extraite de tes captures Keycloak
KEYCLOAK_URL = "http://localhost:8080"
REALM = "agendai-app"
CLIENT_ID = "agendai-app"

token_url = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=token_url)

async def get_current_user_id(token: str = Depends(oauth2_scheme)) -> UUID:
    try:
        
        payload = jwt.decode(
            token, 
            None, 
            options={
                "verify_signature": False, 
                "verify_aud": False, 
                "verify_exp": True   
            }
        )
        
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Jeton malformé : sub manquant")
            
        return UUID(user_id)

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Session expirée ou invalide : {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )