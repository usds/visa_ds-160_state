from pydantic import BaseModel
from datetime import datetime


class Session(BaseModel):
    id: str
    user_id: int
    created_at: datetime
