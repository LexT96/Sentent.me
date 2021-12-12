import json, requests, pymongo, os
from dotenv import load_dotenv


# fetches the current entry and gets all relevant stock symbols
def fetch_stock_symbols_for_today():
    client = pymongo.MongoClient(f'mongodb+srv://root:{os.environ["MONGO_PASSWORD"]}@{os.environ["MONGO_ADDRESS"]}/stonks?retryWrites=true&w=majority')
    db = client.get_database('stonks')
    entry = db.entries.find({}).limit(1).sort([('$natural',-1)])[0]
    symbols = []
    for stock_value in entry["values"]:
        symbols.append(stock_value["symbol"])
    return symbols

def update_prices_in_db():
    load_dotenv()
    symbols = fetch_stock_symbols_for_today()
    for symbol in symbols:
        try:
            url = f'https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?apikey={os.environ["STOCK_API_KEY"]}&timeseries=30'
            response = requests.get(url)
            historical = response.json()
            client = pymongo.MongoClient(f'mongodb+srv://root:{os.environ["MONGO_PASSWORD"]}@{os.environ["MONGO_ADDRESS"]}/stonks?retryWrites=true&w=majority')
            db = client.get_database('stonks')
            db.stocks.update_one({'symbol': symbol}, {'$set': historical})
        except:
            print(f'Error fetching {symbol}')

# def lambda_handler(event, context):
    #load_dotenv()
#     return {
#         'statusCode': 200,
#         'body': json.dumps('Hello from Lambda!')
#     }


if __name__ == '__main__':
    update_prices_in_db()
