from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db import get_session

from . import service
from .models import Measurement
from .schemas import (
    ComparisonOut,
    MeasurementCreate,
    MeasurementList,
    MeasurementOut,
    MeasurementUpdate,
)

router = APIRouter(prefix="/measurements", tags=["measurements"])


def get_or_404(
    measurement_id: int, session: Session = Depends(get_session)
) -> Measurement:
    item = service.get_measurement(session, measurement_id)
    if item is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Measurement not found")
    return item


@router.get("", response_model=MeasurementList)
def list_measurements(
    q: str | None = Query(default=None, max_length=200),
    mode: str | None = Query(default=None, pattern="^(conventional|adaptive)$"),
    sort_by: str = Query(default="measured_at", pattern="^(measured_at|power|lux|voltage)$"),
    sort_order: str = Query(default="desc", pattern="^(asc|desc)$"),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    session: Session = Depends(get_session),
):
    items, total = service.list_measurements(
        session, q, mode, sort_by, sort_order, limit, offset
    )
    return {"items": items, "total": total, "limit": limit, "offset": offset}


@router.get("/comparison", response_model=ComparisonOut)
def compare_modes(session: Session = Depends(get_session)):
    return service.comparison(session)


@router.get("/{measurement_id}", response_model=MeasurementOut)
def read_measurement(item: Measurement = Depends(get_or_404)):
    return item


@router.post("", response_model=MeasurementOut, status_code=status.HTTP_201_CREATED)
def create_measurement(data: MeasurementCreate, session: Session = Depends(get_session)):
    return service.create_measurement(session, data)


@router.patch("/{measurement_id}", response_model=MeasurementOut)
def update_measurement(
    data: MeasurementUpdate,
    item: Measurement = Depends(get_or_404),
    session: Session = Depends(get_session),
):
    return service.update_measurement(session, item, data)


@router.delete("/{measurement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_measurement(
    item: Measurement = Depends(get_or_404), session: Session = Depends(get_session)
) -> None:
    service.delete_measurement(session, item)
