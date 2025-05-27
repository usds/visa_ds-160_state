from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import EmailStr

from app.models.user_model import User as DBUser
from app.models.application_model import Application as DBApplication
from app.schemas.application import Application, ApplicationData
from app.db import get_db
from app.dependencies.session import get_current_user

router = APIRouter()


@router.post("/", response_model=Application)
async def create_new_application(
    session: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user),
):
    db_application = DBApplication(user=current_user.id, data={})
    session.add(db_application)
    session.commit()
    session.refresh(db_application)
    application = Application(
        user_email=current_user.email,
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )
    return application


@router.get("/{application_id}", response_model=Application)
async def get_application(
    application_id: str,
    session: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user),
):
    db_application = session.get(DBApplication, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    if db_application.user != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    application = Application(
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )
    return application


@router.get("/", response_model=list[Application])
async def get_all_applications(
    session: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user),
):
    db_applications = (
        session.query(DBApplication).filter(DBApplication.user == current_user.id).all()
    )
    applications = [
        Application(
            id=db_application.id,
            user_email=current_user.email,
            data=ApplicationData(**(db_application.data or {})),
        )
        for db_application in db_applications
    ]
    return applications


@router.patch("/{application_id}", response_model=Application)
async def update_application(
    application_id: str,
    application_data: ApplicationData,
    session: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user),
):
    db_application = session.get(DBApplication, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    if db_application.user != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    db_application.data = application_data.model_dump(mode="json")
    session.commit()
    session.refresh(db_application)
    return Application(
        id=db_application.id,
        data=ApplicationData(**(db_application.data or {})),
    )


@router.delete("/{application_id}")
async def delete_application(
    application_id: str,
    session: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user),
):
    db_application = session.get(DBApplication, application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    if db_application.user != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    session.delete(db_application)
    session.commit()
    return {"application deleted": str(db_application.id)}
