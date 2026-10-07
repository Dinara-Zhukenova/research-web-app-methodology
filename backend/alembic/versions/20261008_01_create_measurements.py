"""create measurements

Revision ID: 20261008_01
Revises:
"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "20261008_01"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "measurements",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("measured_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("control_mode", sa.String(length=20), nullable=False),
        sa.Column("voltage", sa.Float(), nullable=False),
        sa.Column("current", sa.Float(), nullable=False),
        sa.Column("power", sa.Float(), nullable=False),
        sa.Column("lux", sa.Float(), nullable=False),
        sa.Column("lighting_on", sa.Boolean(), nullable=False),
        sa.Column("device_online", sa.Boolean(), nullable=False),
        sa.Column("data_source", sa.String(length=30), nullable=False),
        sa.Column("note", sa.String(length=500), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_measurements_measured_at", "measurements", ["measured_at"])
    op.create_index("ix_measurements_control_mode", "measurements", ["control_mode"])
    op.create_index("ix_measurements_power", "measurements", ["power"])
    op.create_index("ix_measurements_data_source", "measurements", ["data_source"])


def downgrade() -> None:
    op.drop_table("measurements")
