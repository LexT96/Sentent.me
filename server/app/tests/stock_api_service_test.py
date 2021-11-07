from app.services.stock_api_service import fetch_tickers, fetch_stock_information

def test_stock_information_fetching():
    stock_information = fetch_stock_information("AAPL")
    assert stock_information is not None
    assert stock_information["symbol"] == "AAPL"
