from pydantic import BaseModel
from datetime import datetime


class Session(BaseModel):
    id: str
    user_id: int
    last_active_at: datetime


class LoginInfo(BaseModel):
    email: str
    password: str