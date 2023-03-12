import json
import time
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
    return PageData(content="Home page - no auth")


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
async def get_editable_page():
    time.sleep(1)
    with open(EDITABLE_PAGE_DATA_FILE, encoding="utf-8") as file:
        return PageData(content=file.read())


@app.post("/editable-page")
async def post_editable_page(payload: PageData):
    with open(EDITABLE_PAGE_DATA_FILE, "w", encoding="utf-8") as file:
        file.write(payload.content)
    return payload


def start():
    uvicorn.run(
        "backend_fastapi.main:app",
        host="0.0.0.0",
        port=UVICORN_PORT,
        reload=UVICORN_RELOAD,
    )
