import json
import time
from backend_fastapi.error import raise_400
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urljoin


from .auth import auth, AuthInfo
from .config import CORS_ORIGINS, EDITABLE_PAGE_DATA_FILE, UVICORN_PORT, UVICORN_RELOAD


class PageData(BaseModel):
    content: str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_root():
    time.sleep(1)
    return PageData(
        content=(
            "Welcome to the home page! Sorry for the delay, but it's a feature ;-)\n"
            "PS: This endpoint does not need any authentication"
        )
    )


@app.get("/page")
async def get_page(auth_info: AuthInfo = Depends(auth)):
    time.sleep(5)
    return PageData(
        content=(
            "User info:\n\n"
            f"{json.dumps(auth_info.user_info, indent=2)}"
            "\n\n"
            "Token info:\n\n"
            f"{json.dumps(auth_info.token_info, indent=2)}"
        )
    )


@app.get("/editable-page")
async def get_editable_page(auth_info: AuthInfo = Depends(auth)):
    time.sleep(1)
    with open(EDITABLE_PAGE_DATA_FILE, encoding="utf-8") as file:
        return PageData(content=file.read())


@app.post("/editable-page")
async def post_editable_page(pageData: PageData):
    if not pageData.content or not pageData.content.strip():
        raise_400("The content cannot be empty")

    time.sleep(1)
    with open(EDITABLE_PAGE_DATA_FILE, "w", encoding="utf-8") as file:
        file.write(pageData.content)
    return pageData


def start():
    uvicorn.run(
        "backend_fastapi.main:app",
        host="0.0.0.0",
        port=UVICORN_PORT,
        reload=UVICORN_RELOAD,
    )
