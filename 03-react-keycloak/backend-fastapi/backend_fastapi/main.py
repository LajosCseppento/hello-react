"""Application entry point."""
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import CORS_ORIGINS, UVICORN_PORT, UVICORN_RELOAD
from .api.public import public
from .api.secure import secure

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(public)
app.include_router(secure)


def start():
    """Application starter."""
    uvicorn.run(
        "backend_fastapi.main:app",
        host="0.0.0.0",
        port=UVICORN_PORT,
        reload=UVICORN_RELOAD,
    )
