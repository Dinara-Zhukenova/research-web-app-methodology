from sqlalchemy import asc, desc, func, or_, select
from sqlalchemy.orm import Session

from .models import Measurement
from .schemas import MeasurementCreate, MeasurementUpdate

SORT_FIELDS = {
    "measured_at": Measurement.measured_at,
    "power": Measurement.power,
    "lux": Measurement.lux,
    "voltage": Measurement.voltage,
}


def list_measurements(
    session: Session,
    q: str | None,
    mode: str | None,
    sort_by: str,
    sort_order: str,
    limit: int,
    offset: int,
) -> tuple[list[Measurement], int]:
    filters = []
    if q:
        pattern = f"%{q}%"
        filters.append(
            or_(Measurement.data_source.ilike(pattern), Measurement.note.ilike(pattern))
        )
    if mode:
        filters.append(Measurement.control_mode == mode)
    count_stmt = select(func.count()).select_from(Measurement).where(*filters)
    total = session.scalar(count_stmt) or 0
    column = SORT_FIELDS[sort_by]
    ordering = desc(column) if sort_order == "desc" else asc(column)
    stmt = select(Measurement).where(*filters).order_by(ordering, Measurement.id.desc())
    items = list(session.scalars(stmt.limit(limit).offset(offset)))
    return items, total


def get_measurement(session: Session, measurement_id: int) -> Measurement | None:
    return session.get(Measurement, measurement_id)


def create_measurement(session: Session, data: MeasurementCreate) -> Measurement:
    item = Measurement(**data.model_dump())
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


def update_measurement(
    session: Session, item: Measurement, data: MeasurementUpdate
) -> Measurement:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    session.commit()
    session.refresh(item)
    return item


def delete_measurement(session: Session, item: Measurement) -> None:
    session.delete(item)
    session.commit()


def comparison(session: Session) -> dict[str, float]:
    rows = session.execute(
        select(Measurement.control_mode, func.avg(Measurement.power))
        .where(Measurement.lighting_on.is_(True))
        .group_by(Measurement.control_mode)
    ).all()
    values = {mode: float(value or 0) for mode, value in rows}
    conventional = round(values.get("conventional", 0), 2)
    adaptive = round(values.get("adaptive", 0), 2)
    savings = round((conventional - adaptive) / conventional * 100, 2) if conventional else 0
    return {
        "conventional_average_power": conventional,
        "adaptive_average_power": adaptive,
        "savings_percent": savings,
    }
