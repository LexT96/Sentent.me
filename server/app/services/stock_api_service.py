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

def fetch_old_tickers():
    url = 'https://api.nasdaq.com/api/screener/stocks?download=true'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10.15 rv: 90.0) Gecko/20100101 Firefox/93.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'Accept-Language: de,en-US;q=0.7,en;q=0.3',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': "none",
        'Sec-Fetch-User': '?1',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'TE': 'trailer',
        }
    number_of_tries = 0
    while number_of_tries < 4: 
        request = requests.get(url, headers=headers)
        json_data = request.json()
        stocks = json_data["data"]["rows"]
        if stocks:
            return stocks
        number_of_tries += 1
    return None 

def fetch_tickers():
    filters = ['exch_nasd']
    stock_list = Screener(filters=filters, table='Overview', order='price')
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


        
        # percent_change_string = stock["Change"][0:-1]
        # price = float(stock['Price']
        # percent_change = float(percent_change_string)
        # old_price = 100 * (float(stock["Price"]) / (100 + percent_change))
        # price_change = old_price * (percent_change / 100)
        # mapped_list.append(
        #     {'symbol': stock['Ticker'], 'price': price, 'pricePercentChange': percent_change, 'priceChange': round(price_change,2)})
    return mapped_list


