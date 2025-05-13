import uuid

from pydantic import EmailStr
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from models.base import Base


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[EmailStr] = mapped_column(String(255), unique=True, index=True)
