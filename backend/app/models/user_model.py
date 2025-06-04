from pydantic import EmailStr, SecretStr
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[EmailStr] = mapped_column(String(255), unique=True, index=True)
    password: Mapped[SecretStr] = mapped_column(String)