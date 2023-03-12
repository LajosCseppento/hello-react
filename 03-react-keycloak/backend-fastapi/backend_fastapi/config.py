"""Configuration constants"""

EDITABLE_PAGE_DATA_FILE = "data/editable-page.txt"

KEYCLOAK_SERVER = "http://localhost:10301/"
KEYCLOAK_REALM = "Demo"
KEYCLOAK_CLIENT = "backend"
KEYCLOAK_CLIENT_SECRET = "g6w1ddYfsnq0oUM75wj3Fg8aiUnFZJhY"  # cspell:disable-line

CORS_ORIGINS = [
    "http://localhost:10300",
    "localhost:10300",
    "http://127.0.0.1:10300",
    "127.0.0.1:10300",
]
UVICORN_PORT: int = 10302
UVICORN_RELOAD: bool = True
