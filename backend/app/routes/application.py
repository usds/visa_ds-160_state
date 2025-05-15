from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user_model import User as UserModel
from app.models.application_model import Application as ApplicationModel
from app.schemas.application import Application, ApplicationData
from app.db import get_session
from pydantic import EmailStr

router = APIRouter()

@router.post("/", response_model=Application)
async def create_new_application(
    user_email: EmailStr, session: Session = Depends(get_session)
):
    db_user = (
        session.query(UserModel).filter(UserModel.email == user_email).one_or_none()
    )
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_application = ApplicationModel(user=db_user.id, data={})
    session.add(db_application)
    session.commit()
    session.refresh(db_application)
    application = Application(
        user_email=db_user.email,
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )
    return application

@router.get("/{application_id}", response_model=Application)
async def get_application(application_id: str, session: Session = Depends(get_session)):
    db_application = session.get(ApplicationModel, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    application = Application(
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )
    return application

@router.patch("/{application_id}", response_model=Application)
async def update_application(
    application_id: str, application_data: ApplicationData, session: Session = Depends(get_session)
):
    db_application = session.get(ApplicationModel, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    db_application.data = application_data.model_dump(mode="json")
    session.commit()
    session.refresh(db_application)
    return Application(
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )

@router.delete("/{application_id}")
async def delete_application(application_id: str, session: Session = Depends(get_session)):
    db_application = session.get(ApplicationModel, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    session.delete(db_application)
    session.commit()
    return {"application deleted": str(db_application.id)}