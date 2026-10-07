from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Mode = Literal["conventional", "adaptive"]
Source = Literal["simulation", "mqtt", "manual"]


class MeasurementBase(BaseModel):
    measured_at: datetime
    control_mode: Mode
    voltage: float = Field(ge=0, le=500)
    current: float = Field(ge=0, le=100)
    power: float = Field(ge=0, le=50000)
    lux: float = Field(ge=0, le=200000)
    lighting_on: bool = True
    device_online: bool = True
    data_source: Source = "manual"
    note: str | None = Field(default=None, max_length=500)


class MeasurementCreate(MeasurementBase):
    pass


class MeasurementUpdate(BaseModel):
    measured_at: datetime | None = None
    control_mode: Mode | None = None
    voltage: float | None = Field(default=None, ge=0, le=500)
    current: float | None = Field(default=None, ge=0, le=100)
    power: float | None = Field(default=None, ge=0, le=50000)
    lux: float | None = Field(default=None, ge=0, le=200000)
    lighting_on: bool | None = None
    device_online: bool | None = None
    data_source: Source | None = None
    note: str | None = Field(default=None, max_length=500)


class MeasurementOut(MeasurementBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime


class MeasurementList(BaseModel):
    items: list[MeasurementOut]
    total: int
    limit: int
    offset: int


class ComparisonOut(BaseModel):
    conventional_average_power: float
    adaptive_average_power: float
    savings_percent: float
