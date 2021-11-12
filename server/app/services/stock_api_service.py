import requests
import os
from finviz.screener import Screener

def fetch_stock_information(symbol):
    url = f'https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={os.environ["STOCK_API_KEY"]}'
    request = requests.get(url)
    information = request.json()
    if len(information) == 1:
        information[0]["_id"] = information[0]["symbol"]
        return information[0]
    return None

def fetch_tickers():
    stock_list = Screener(table='Overview', order='price')
    mapped_list = []
    for stock in stock_list:
        try:
            percent_change_string = stock["Change"][0:-1]
            percent_change = float(percent_change_string)
            old_price = 100 * (float(stock["Price"]) / (100 + percent_change))
            price_change = old_price * (percent_change / 100)
            mapped_list.append({"symbol": stock["Ticker"], "price": "$" + stock["Price"], "priceChange": str(round(price_change,2)), "pricePercentChange": str(round(percent_change,2)) + "%"})
        except Exception as e:
            print(e)
    return mapped_list


