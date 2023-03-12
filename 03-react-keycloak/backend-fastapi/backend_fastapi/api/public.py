"""Public API endpoints"""
import time
from backend_fastapi.model import PageData
from fastapi import APIRouter


public = APIRouter()


@public.get("/")
async def get_root():
    """Returns the content of the home page.

    Returns:
        PageData: page content
    """
    time.sleep(1)  # Intentional delay
    return PageData(
        content=(
            "Welcome to the home page! Sorry for the delay, but it's a feature ;-)\n"
            "PS: This endpoint does not need any authentication"
        )
    )
