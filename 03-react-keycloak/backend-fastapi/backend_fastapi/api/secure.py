"""Secure API endpoints"""

import json
import time
from backend_fastapi.auth import auth, AuthInfo
from backend_fastapi.config import EDITABLE_PAGE_DATA_FILE
from backend_fastapi.error import raise_400
from backend_fastapi.model import PageData
from fastapi import APIRouter, Depends


secure = APIRouter(dependencies=[Depends(auth)])


@secure.get("/page")
async def get_page(auth_info: AuthInfo = Depends(auth)):
    """Returns the content of the page.

    Returns:
        PageData: page content
    """
    time.sleep(5)  # Intentional delay
    return PageData(
        content=(
            "User info:\n\n"
            f"{json.dumps(auth_info.user_info, indent=2)}"
            "\n\n"
            "Token info:\n\n"
            f"{json.dumps(auth_info.token_info, indent=2)}"
        )
    )


@secure.get("/editable-page")
async def get_editable_page():
    """Returns the content of the editable page.

    Returns:
        PageData: page content
    """
    time.sleep(1)  # Intentional delay
    with open(EDITABLE_PAGE_DATA_FILE, encoding="utf-8") as file:
        return PageData(content=file.read())


@secure.post("/editable-page")
async def post_editable_page(page_data: PageData):
    """Updates the content of the editable page.

    Args:
        pageData (PageData): new page content

    Returns:
        PageData: new page content
    """
    if not page_data.content or not page_data.content.strip():
        raise_400("The content cannot be empty")

    time.sleep(2)  # Intentional delay
    with open(EDITABLE_PAGE_DATA_FILE, "w", encoding="utf-8") as file:
        file.write(page_data.content)
    return page_data
