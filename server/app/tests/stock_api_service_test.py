from app.services.stock_api_service import fetch_tickers

def test_data_fetching():
    stocks = fetch_tickers()
    assert type(stocks) == list
    assert len(stocks) > 7000