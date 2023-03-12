"""Application models."""
from pydantic import BaseModel


class PageData(BaseModel):
    """Represents a page's data."""

    content: str
