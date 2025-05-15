from datetime import date
from enum import Enum
from typing import Annotated, Optional
import os
import uuid

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr
from pydantic.alias_generators import to_camel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import User as UserModel
from models import Application as ApplicationModel

db_url = os.environ.get("DB_CONNECTION_STRING")
engine = create_engine(db_url)
Session = sessionmaker(bind=engine)
session = Session()


def get_session():
    with Session() as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

# Allow CORS for all origins (you can restrict this to specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    # List of allowed origins, use ["http://localhost:3000"] for specific frontend
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Convert inputs to camel_case
class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        from_attributes=True,
        validate_by_name=True,
        validate_by_alias=True,
    )


# Define the Pydantic model for application data
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
    # needed to create a new application but not in the DB
    user_email: Optional[EmailStr] = None
    id: Optional[uuid.UUID] = None  # not needed to create a new applicatin
    data: ApplicationData


@app.post("/api/application/")
async def create_new_application(
    user_email: EmailStr, session: SessionDep
) -> Application:
    # Find the user by email
    db_user = (
        session.query(UserModel).filter(UserModel.email == user_email).one_or_none()
    )
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    # Create a new application for the user
    db_application = ApplicationModel(user=db_user.id, data={})
    session.add(db_application)
    session.commit()
    session.refresh(db_application)
    # Convert the SQLAlchemy model to the Pydantic schema
    application = Application(
        user_email=db_user.email,
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )
    return application


@app.get("/api/application/{application_id}")
async def get_application(application_id: str, session: SessionDep) -> Application:
    db_application = session.get(ApplicationModel, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    # Convert the SQLAlchemy model to the Pydantic schema
    application = Application(
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )
    return application


@app.patch("/api/application/{application_id}")
async def update_application(
    application_id: str, application_data: ApplicationData, session: SessionDep
) -> Application:
    db_application = session.get(ApplicationModel, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    db_application.data = application_data.model_dump(mode="json")
    session.commit()
    session.refresh(db_application)
    return db_application


@app.delete("/api/application/{application_id}")
async def delete_application(
    application_id: str, session: SessionDep
) -> dict[str, str]:
    db_application = session.get(ApplicationModel, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    session.delete(db_application)
    session.commit()
    return {"application deleted": str(db_application.id)}


# Define the Pydantic model for user data
class User(BaseSchema):
    email: EmailStr


# Pydantic user model with applications
class UserWithApplications(BaseSchema):
    email: EmailStr
    applications: list[Application] = []


@app.post("/api/users")
async def create_user(user: User, session: SessionDep) -> User:
    db_user = UserModel(email=user.email)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.get("/api/users/{email}")
async def get_user(email: EmailStr, session: SessionDep) -> UserWithApplications:
    db_user = session.query(UserModel).filter(UserModel.email == email).one_or_none()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_applications = (
        session.query(ApplicationModel)
        .filter(ApplicationModel.user == db_user.id)
        .all()
    )
    # Convert each db models to Pydantic schema
    applications = [
        Application(
            user_email=db_user.email,
            id=app.id,
            data=ApplicationData(**(app.data or {})),
        )
        for app in db_applications
    ]
    return UserWithApplications(email=db_user.email, applications=applications)


@app.get("/api/users")
async def get_all_users():
    users_query = session.query(UserModel)
    return users_query.all()


@app.delete("/api/users/{email}")
async def delete_user(email: EmailStr):
    user = session.query(UserModel).filter(UserModel.email == email).one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Check if the user has any applications before deleting
    applications = (
        session.query(ApplicationModel).filter(ApplicationModel.user == user.id).all()
    )
    if applications:
        raise HTTPException(
            status_code=400,
            detail="User has applications and cannot be deleted",
        )
    # Delete the user
    session.delete(user)
    session.commit()
    return {"user deleted": user.email}
