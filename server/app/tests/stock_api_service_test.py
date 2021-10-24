from app.services.stock_api_service import fetch_tickers, fetch_stock_information
def test_ticker_fetching():
    stocks = fetch_tickers()
    assert type(stocks) == list
    assert len(stocks) > 7000

def test_stock_information_fetching():
    stock_information = fetch_stock_information("AAPL")
    assert stock_information is not None
    assert stock_information["symbol"] == "AAPL"
