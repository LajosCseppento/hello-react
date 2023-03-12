"""Common error handling."""
from fastapi import HTTPException


def raise_400(detail: str):
    """Raises a HTTP 400 Bad Request exception.

    Args:
        detail (str): exception detail

    Raises:
        HTTPException: exception
    """
    raise HTTPException(
        status_code=400,
        detail=detail,
    )


def raise_401():
    """Raises a HTTP 401 Unauthorized exception.

    Raises:
        HTTPException: exception
    """
    raise HTTPException(
        status_code=401,
        detail=(
            "Invalid token. Please log in. If you are logged in, "
            "then please log out and log in again."
        ),
    )
