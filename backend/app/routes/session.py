from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
from sqlalchemy.orm import Session
from app.models.user_model import User as UserModel
from app.models.session_model import Session as SessionModel
from app.schemas.session import Session as SessionSchema
from app.schemas.user import User as UserSchema
from app.db import get_db
from app.dependencies.session import get_current_user
from app.models.session_model import SESSION_EXPIRATION_SECONDS
import uuid
import datetime

router = APIRouter()

SESSION_COOKIE_NAME = "session_id"


@router.post("/login", response_model=SessionSchema)
async def login(email: str, response: Response, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == email).one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Create session
    session_id = str(uuid.uuid4())
    db_session = SessionModel(id=session_id, user_id=user.id)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    # Set cookie
    response.set_cookie(
        key=SESSION_COOKIE_NAME, value=session_id, httponly=True, samesite="lax"
    )
    return db_session


@router.post("/logout")
async def logout(
    response: Response,
    db: Session = Depends(get_db),
    session_id: str = Cookie(None, alias=SESSION_COOKIE_NAME),
):
    if not session_id:
        raise HTTPException(status_code=401, detail="Not logged in")
    db_session = (
        db.query(SessionModel).filter(SessionModel.id == session_id).one_or_none()
    )
    if db_session:
        db.delete(db_session)
        db.commit()
    response.delete_cookie(key=SESSION_COOKIE_NAME)
    return {"detail": "Logged out"}


@router.get("/me", response_model=UserSchema)
async def get_me(current_user: UserModel = Depends(get_current_user)):
    return current_user


@router.delete("/cleanup-expired-sessions")
async def cleanup_expired_sessions(db: Session = Depends(get_db)):
    expiration_time = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(
        seconds=SESSION_EXPIRATION_SECONDS
    )
    deleted_count = (
        db.query(SessionModel)
        .filter(SessionModel.last_active_at < expiration_time)
        .delete(synchronize_session=False)
    )
    db.commit()
    return {"deleted": deleted_count}
