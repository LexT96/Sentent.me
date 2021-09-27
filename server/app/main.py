from datetime import datetime
from flask import jsonify
from requests.models import stream_decode_response_unicode
from app import app
import json
from app.services.stock_api_service import fetch_tickers
from app.services.db_service import insert_stocks, get_entries, get_all_stocks, insert_prices_for_today, insert_entry
from app.services.reddit_service import get_posts, group_posts_by_stock
from app.services.sentiment_service import add_sentiment_to_posts, calculate_average_sentiment

@app.route('/', methods=['GET'])
def index():
    stocks = get_all_stocks()
    return jsonify(stocks)
    # return jsonify(books)

@app.route("/stocks", methods=['GET'])
def get_stocks():
    stocks = get_all_stocks()
    return jsonify(stocks)

@app.route("/entries", methods=['GET'])
def get():
    entries = get_entries()
    return jsonify(entries)

@app.route('/fetch')
def fetch():
    stocks = fetch_tickers()
    create_entry(stocks)
    return "Hello World"

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






    
