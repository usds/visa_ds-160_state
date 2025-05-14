from typing import Annotated
import os

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr
from pydantic.alias_generators import to_camel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import User as UserModel

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
        populate_by_name=True,
        from_attributes=True,
    )


# Define the Pydantic model for user data
class User(BaseSchema):
    email: EmailStr


@app.post("/api/users")
async def create_user(user: User, session: SessionDep) -> User:
    db_user = UserModel(email=user.email)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.get("/api/users")
async def get_all_users():
    users_query = session.query(UserModel)
    return users_query.all()


@app.delete("/api/users/{email}")
async def delete_user(email: EmailStr):
    user = session.query(UserModel).filter(UserModel.email == email).one()
    session.delete(user)
    session.commit()
    return {"user deleted": user.email}
