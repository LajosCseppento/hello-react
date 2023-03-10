"""Keycloak authentication components."""
from backend_fastapi.error import raise_401
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakAuthenticationError, KeycloakInvalidTokenError
from pydantic import BaseModel

from .config import (
    KEYCLOAK_CLIENT,
    KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_REALM,
    KEYCLOAK_SERVER,
)


class AuthInfo(BaseModel):
    """Authentication info."""

    # {
    #   "sub": "f1d54a64-2f67-4a49-860e-6d74cfa1e319",
    #   "email_verified": false,
    #   "name": "Lajos",
    #   "preferred_username": "lajos",
    #   "given_name": "Lajos",
    #   "family_name": ""
    # }
    user_info: dict
    #     {
    #   "exp": 1677017737,
    #   "iat": 1677017437,
    #   "auth_time": 1677015164,
    #   "jti": "536b6610-d1e2-4744-8452-22c64a804baa",
    #   "iss": "http://localhost:10301/realms/Demo",
    #   "aud": "account",
    #   "sub": "f1d54a64-2f67-4a49-860e-6d74cfa1e319",
    #   "typ": "Bearer",
    #   "azp": "frontend",
    #   "nonce": "22a5f02b-dcda-4a41-b354-8f7903c1f1aa",
    #   "session_state": "86c1e8f9-8170-4357-8415-abe55af37aff",
    #   "name": "Lajos",
    #   "given_name": "Lajos",
    #   "family_name": "",
    #   "preferred_username": "lajos",
    #   "email_verified": false,
    #   "acr": "0",
    #   "allowed-origins": [
    #     "http://localhost:10300"
    #   ],
    #   "realm_access": {
    #     "roles": [
    #       "offline_access",
    #       "admin",
    #       "default-roles-demo",
    #       "uma_authorization",
    #       "demo"
    #     ]
    #   },
    #   "resource_access": {
    #     "account": {
    #       "roles": [
    #         "manage-account",
    #         "manage-account-links",
    #         "view-profile"
    #       ]
    #     }
    #   },
    #   "scope": "openid profile email",
    #   "sid": "86c1e8f9-8170-4357-8415-abe55af37aff",
    #   "client_id": "frontend",
    #   "username": "lajos",
    #   "active": true
    # }
    token_info: dict


def init_oauth2_scheme():
    """Initialises OAuth 2 scheme.

    Returns:
        OAuth2PasswordBearer: bearer
    """
    token_endpoint = keycloak.well_known()["token_endpoint"]
    return OAuth2PasswordBearer(tokenUrl=token_endpoint)


keycloak = KeycloakOpenID(
    server_url=KEYCLOAK_SERVER,
    realm_name=KEYCLOAK_REALM,
    client_id=KEYCLOAK_CLIENT,
    client_secret_key=KEYCLOAK_CLIENT_SECRET,
)
oauth2_scheme = init_oauth2_scheme()


async def auth(token: str = Depends(oauth2_scheme)):
    """Authentication dependency.

    Args:
        token (str): OAuth 2 scheme bearer

    Raises:
        HTTPException: 401 Unauthorized

    Returns:
        AuthInfo: authentication info
    """
    try:
        user_info = keycloak.userinfo(token)  # cspell:disable-line
        token_info = keycloak.introspect(token)

        if token_info["active"]:
            return AuthInfo(user_info=user_info, token_info=token_info)
        else:
            raise raise_401()
    except (KeycloakAuthenticationError, KeycloakInvalidTokenError):
        raise raise_401()
