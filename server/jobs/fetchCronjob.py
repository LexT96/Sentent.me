from app.services.stock_api_service import fetch_tickers
from app.services.db_service import insert_stocks, insert_entry
from app.services.reddit_service import get_posts, group_posts_by_stock
from app.services.sentiment_service import add_sentiment_to_posts, calculate_average_sentiment
from datetime import datetime

def fetchJob():
    print("OK")
    # retries = 0
    # while retries < 4:
    #     try:
    #         stocks = fetch_tickers()
    #         create_entry(stocks)
    #         update_stock_values(stocks)
    #         return
    #     except Exception as e:
    #         print(e)
    #         retries = retries + 1
    


def create_entry(stock_data):
    posts = get_posts()
    posts = add_sentiment_to_posts(posts)
    grouped_posts = group_posts_by_stock(posts)
    sorted(grouped_posts, key=len, reverse=True)
    entry_values = []
    for group in grouped_posts:
        symbol = group[0].stock
        mentions = len(group)
        sentiment = calculate_average_sentiment(group)
        for stock in stock_data:
            if stock["symbol"] == symbol:
                #binary
                entry_values.append({"symbol": symbol, "name": stock["name"], "price": stock["lastsale"], 
                "priceChange": stock["netchange"], "pricePercentChange": stock["pctchange"],  "sentiment": sentiment, 
                "mentions": mentions})
                continue
    today = datetime.today().strftime('%d.%m.%Y')
    entry = {"_id": today, "values": entry_values}
    insert_entry(entry)
    pass

def update_stock_values(stocks):
    stock_data = []
    for index,stock in enumerate(stocks):
        stock_data.append({"_id": stock["symbol"], "name": stock["name"], "sector": stock["sector"], 
                        "industry": stock["industry"]})
        if index % 49 == 0 and index > 0:
            print(stock_data)
    insert_stocks(stock_data)