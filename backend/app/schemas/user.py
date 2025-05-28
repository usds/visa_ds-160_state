from pydantic import EmailStr
from app.schemas.base import BaseSchema
from app.schemas.application import Application


class User(BaseSchema):
    email: EmailStr


class UserWithApplications(BaseSchema):
    email: EmailStr
    applications: list[Application] = []
