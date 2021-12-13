import requests
import os
from finviz.screener import Screener

# fetches detailed information from a single stock like logo, description, etc.
def fetch_stock_information(symbol: str):
    url = f'https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={os.environ["STOCK_API_KEY"]}'
    request = requests.get(url)
    information = request.json()
    # if the given symbol matches a stock add the "_id" attribute to it and return it
    if len(information) >= 1:
        information[0]["_id"] = information[0]["symbol"]
        return information[0]
    return None

# returns all currently available tickers from finviz
def fetch_all_tickers():
    tickers = Screener(table='Overview', order='price')
    return tickers

# maps all tickers to their symbols and returns them
def fetch_all_symbols():
    tickers = fetch_all_tickers()
    mapped_list = []
    for ticker in tickers:
        mapped_list.append(ticker["Ticker"])
    return mapped_list

# fetches all tickers and maps them to the needed format to be saved as an entry value
def fetch_tickers_for_entry_values():
    tickers = fetch_all_tickers()
    mapped_list = []
    for ticker in tickers:
        try:
            percent_change_string = ticker["Change"][0:-1]
            percent_change = float(percent_change_string)
            old_price = 100 * (float(ticker["Price"]) / (100 + percent_change))
            price_change = old_price * (percent_change / 100)
            mapped_list.append({
                "symbol": ticker["Ticker"], 
                "price": "$" + ticker["Price"], 
                "priceChange": str(round(price_change,2)),
                "pricePercentChange": str(round(percent_change,2)) + "%"
                })
        except Exception as e:
            print(e)
    return mapped_list


