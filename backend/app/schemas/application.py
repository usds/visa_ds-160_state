from datetime import date
from typing import Optional
from pydantic import EmailStr
from enum import Enum
import uuid
from app.schemas.base import BaseSchema


class PassportTypeEnum(str, Enum):
    tourist = "tourist"
    diplomatic = "diplomatic"
    official = "official"


class ApplicationData(BaseSchema):
    passport_type: Optional[PassportTypeEnum] = None
    passport_country: Optional[str] = None
    passport_book_number: Optional[str] = None
    passport_issuance_date: Optional[date] = None
    passport_expiration_date: Optional[date] = None
    surname: Optional[str] = None
    given_name: Optional[str] = None
    native_alphabet_name: Optional[str] = None
    other_names: Optional[list[str]] = []


class Application(BaseSchema):
    user_email: Optional[EmailStr] = None
    id: Optional[uuid.UUID] = None
    data: ApplicationData
