from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id: Mapped[int] = mapped_column(primary_key=True)
    measured_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    control_mode: Mapped[str] = mapped_column(String(20), index=True)
    voltage: Mapped[float] = mapped_column(Float)
    current: Mapped[float] = mapped_column(Float)
    power: Mapped[float] = mapped_column(Float, index=True)
    lux: Mapped[float] = mapped_column(Float)
    lighting_on: Mapped[bool] = mapped_column(Boolean, default=True)
    device_online: Mapped[bool] = mapped_column(Boolean, default=True)
    data_source: Mapped[str] = mapped_column(String(30), default="simulation", index=True)
    note: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
