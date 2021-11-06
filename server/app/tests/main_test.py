from app import app

def test_stock_route():
    tester = app.test_client()
    response = tester.get("/stocks", content_type="json")
    assert response.status_code == 200
    assert len(response.data) > 0

def test_entries_route():
    tester = app.test_client()
    response = tester.get("/entries", content_type="json")
    assert response.status_code == 200
    assert len(response.data) > 0