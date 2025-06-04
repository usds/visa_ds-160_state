from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from argon2 import PasswordHasher
from app.models.user_model import User as UserModel
from app.models.session_model import Session as SessionModel
from app.models.application_model import Application as ApplicationModel
from app.schemas.user import User
from app.db import get_db
from app.dependencies.session import get_current_user

import uuid

router = APIRouter()


@router.post("/", response_model=User)
async def create_user(
    user: User, db: Session = Depends(get_db), response: Response = None
):
    existing_user = (
        db.query(UserModel).filter(UserModel.email == user.email).one_or_none()
    )
    if existing_user:
        raise HTTPException(
            status_code=409, detail="User with this email already exists"
        )

    ph = PasswordHasher()
    password_hash = ph.hash(user.password.get_secret_value)
    
    db_user = UserModel(email=user.email, password=str(password_hash))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Log the user in by creating a session and setting the cookie
    session_id = str(uuid.uuid4())
    db_session = SessionModel(id=session_id, user_id=db_user.id)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    if response is not None:
        response.set_cookie(
            key="session_id", value=session_id, httponly=True, samesite="lax"
        )
    return User(email=db_user.email, password=db_user.password)


@router.get("/", response_model=list[User])
async def get_all_users(db: Session = Depends(get_db)):
    users_query = db.query(UserModel)
    return [User(email=db_user.email, password=db_user.password) for db_user in users_query.all()]


@router.delete("/delete_current_user")
async def delete_user(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    user = (
        db.query(UserModel).filter(UserModel.email == current_user.email).one_or_none()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    applications = (
        db.query(ApplicationModel).filter(ApplicationModel.user == user.id).all()
    )
    if applications:
        raise HTTPException(
            status_code=400,
            detail="User has applications and cannot be deleted",
        )
    # Delete user sessions
    db.query(SessionModel).filter(SessionModel.user_id == user.id).delete(
        synchronize_session=False
    )
    db.delete(user)
    db.commit()
    return {"user deleted": user.email}
