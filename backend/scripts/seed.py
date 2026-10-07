import random
from datetime import UTC, datetime, timedelta

from sqlalchemy import func, select

from app.db import SessionLocal
from app.modules.measurements.models import Measurement


def main() -> None:
    random.seed(2026)
    with SessionLocal() as session:
        if (session.scalar(select(func.count()).select_from(Measurement)) or 0) > 0:
            print("Seed skipped: database already contains measurements.")
            return
        start = datetime.now(UTC) - timedelta(hours=4)
        for index in range(40):
            mode = "conventional" if index < 20 else "adaptive"
            voltage = round(random.uniform(218, 223), 1)
            current = round(
                random.uniform(3.0, 3.4) if mode == "conventional" else random.uniform(1.8, 2.5),
                2,
            )
            session.add(
                Measurement(
                    measured_at=start + timedelta(minutes=index * 6),
                    control_mode=mode,
                    voltage=voltage,
                    current=current,
                    power=round(voltage * current, 1),
                    lux=round(random.uniform(25, 70), 1),
                    lighting_on=True,
                    device_online=True,
                    data_source="simulation",
                    note="Синтетическое наблюдение для пилотного исследования",
                )
            )
        session.commit()
        print("Created 40 meaningful lighting measurements.")


if __name__ == "__main__":
    main()
