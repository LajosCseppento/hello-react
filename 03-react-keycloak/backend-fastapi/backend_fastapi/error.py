from fastapi import HTTPException


def raise_400(detail: str):
    raise HTTPException(
        status_code=400,
        detail=detail,
    )


def raise_401():
    raise HTTPException(
        status_code=401,
        detail=(
            "Invalid token. Please log in. If you are logged in, "
            "then please log out and log in again."
        ),
    )
