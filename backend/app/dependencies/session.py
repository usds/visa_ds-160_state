from fastapi import Depends, HTTPException, Cookie, status
from sqlalchemy.orm import Session
from app.models.session_model import Session as SessionModel
from app.models.user_model import User as UserModel
from app.db import get_db


SESSION_COOKIE_NAME = "session_id"


def get_current_user(
    db: Session = Depends(get_db),
    session_id: str = Cookie(None, alias=SESSION_COOKIE_NAME),
):
    if not session_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )
    db_session = (
        db.query(SessionModel).filter(SessionModel.id == session_id).one_or_none()
    )
    if not db_session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session"
        )
    # Check expiration
    if db_session.is_expired():
        db.delete(db_session)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired"
        )
    user = db.query(UserModel).filter(UserModel.id == db_session.user_id).one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )
    return user
