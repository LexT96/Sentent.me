import requests

def fetch_tickers():
    url = 'https://api.nasdaq.com/api/screener/stocks?download=true'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10.15 rv: 90.0) Gecko/20100101 Firefox/90.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'}
    number_of_tries = 0
    while number_of_tries < 4: 
        request = requests.get(url, headers=headers)
        json_data = request.json()
        stocks = json_data["data"]["rows"]
        if stocks:
            return stocks
        number_of_tries += 1
    return None    


