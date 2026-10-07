from datetime import UTC, datetime

SAMPLE = {
    "measured_at": datetime(2026, 10, 8, tzinfo=UTC).isoformat(),
    "control_mode": "conventional",
    "voltage": 220.5,
    "current": 3.2,
    "power": 705.6,
    "lux": 42.0,
    "lighting_on": True,
    "device_online": True,
    "data_source": "simulation",
    "note": "Улица Абая",
}


def create(client, **changes):
    return client.post("/measurements", json={**SAMPLE, **changes})


def test_health(client):
    assert client.get("/health").json() == {"status": "ok"}


def test_create_and_read(client):
    response = create(client)
    assert response.status_code == 201
    item_id = response.json()["id"]
    assert client.get(f"/measurements/{item_id}").json()["power"] == 705.6


def test_list_and_pagination(client):
    for index in range(3):
        create(client, note=f"Линия {index}")
    result = client.get("/measurements", params={"limit": 2, "offset": 0}).json()
    assert result["total"] == 3
    assert len(result["items"]) == 2


def test_search_two_fields(client):
    create(client, note="Проспект Абая")
    create(client, data_source="mqtt", note="Другая линия")
    assert client.get("/measurements", params={"q": "Абая"}).json()["total"] == 1
    assert client.get("/measurements", params={"q": "mqtt"}).json()["total"] == 1


def test_filter_and_sort(client):
    create(client, control_mode="adaptive", power=410)
    create(client, control_mode="adaptive", power=500)
    items = client.get(
        "/measurements",
        params={"mode": "adaptive", "sort_by": "power", "sort_order": "asc"},
    ).json()["items"]
    assert [item["power"] for item in items] == [410, 500]


def test_update(client):
    item_id = create(client).json()["id"]
    response = client.patch(f"/measurements/{item_id}", json={"power": 450.2})
    assert response.status_code == 200
    assert response.json()["power"] == 450.2


def test_delete(client):
    item_id = create(client).json()["id"]
    assert client.delete(f"/measurements/{item_id}").status_code == 204
    assert client.get(f"/measurements/{item_id}").status_code == 404


def test_not_found(client):
    assert client.get("/measurements/9999").status_code == 404


def test_validation_error(client):
    assert create(client, voltage=-1).status_code == 422


def test_comparison(client):
    create(client, control_mode="conventional", power=700)
    create(client, control_mode="adaptive", power=455)
    result = client.get("/measurements/comparison").json()
    assert result["savings_percent"] == 35.0
