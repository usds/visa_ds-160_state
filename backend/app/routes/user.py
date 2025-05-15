from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user_model import User as UserModel
from app.models.application_model import Application as ApplicationModel
from app.schemas.user import User, UserWithApplications
from app.schemas.application import Application, ApplicationData
from app.db import get_session

router = APIRouter()


@router.post("/", response_model=User)
async def create_user(user: User, session: Session = Depends(get_session)):
    db_user = UserModel(email=user.email)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    # what to return here?
    return db_user


@router.get("/{email}", response_model=UserWithApplications)
async def get_user(email: str, session: Session = Depends(get_session)):
    db_user = session.query(UserModel).filter(UserModel.email == email).one_or_none()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_applications = (
        session.query(ApplicationModel)
        .filter(ApplicationModel.user == db_user.id)
        .all()
    )
    applications = [
        Application(
            user_email=db_user.email,
            id=app.id,
            data=ApplicationData(**(app.data or {})),
        )
        for app in db_applications
    ]
    return UserWithApplications(email=db_user.email, applications=applications)


@router.get("/", response_model=list[User])
async def get_all_users(session: Session = Depends(get_session)):
    users_query = session.query(UserModel)
    return users_query.all()


@router.delete("/{email}")
async def delete_user(email: str, session: Session = Depends(get_session)):
    user = session.query(UserModel).filter(UserModel.email == email).one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    applications = (
        session.query(ApplicationModel).filter(ApplicationModel.user == user.id).all()
    )
    if applications:
        raise HTTPException(
            status_code=400,
            detail="User has applications and cannot be deleted",
        )
    session.delete(user)
    session.commit()
    return {"user deleted": user.email}
