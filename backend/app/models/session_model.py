from sqlalchemy import ForeignKey, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
import uuid
import datetime

SESSION_EXPIRATION_SECONDS = 3600  # 1 hour


class Session(Base):
    __tablename__ = "session"
    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    last_active_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.datetime.now(datetime.timezone.utc),
        index=True,
    )

    def is_expired(self) -> bool:
        current = datetime.datetime.now(datetime.timezone.utc)
        return (
            current - self.last_active_at
        ).total_seconds() > SESSION_EXPIRATION_SECONDS
