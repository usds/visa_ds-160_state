"""add sessions

Revision ID: 78ba4befdfe3
Revises: b95358876e03
Create Date: 2025-05-27 03:59:56.687595

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "78ba4befdfe3"
down_revision: Union[str, None] = "b95358876e03"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "session",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("user.id"), nullable=False),
        sa.Column(
            "last_active_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_session_last_active_at", "session", ["last_active_at"])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index("ix_session_last_active_at", table_name="session")
    op.drop_table("session")
