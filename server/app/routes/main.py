from datetime import datetime
from flask import jsonify
from requests.models import stream_decode_response_unicode
from app import app
import json
from app.services.stock_api_service import fetch_tickers, fetch_stock_information
from app.services.db_service import get_entries, get_all_stocks, insert_stock, insert_entry
from app.services.reddit_service import get_posts, group_posts_by_stock
from app.services.sentiment_service import add_sentiment_to_posts, calculate_average_sentiment

@app.route("/stocks", methods=['GET'])
def get_stocks():
    stocks = get_all_stocks()
    return jsonify(stocks)

@app.route("/entries", methods=['GET'])
def get():
    entries = get_entries()
    return jsonify(entries)

@app.route('/fetch', methods=['GET'])
def handleGet():
    stocks = fetch_tickers()
    entry = create_entry(stocks)
    return entry


#TODO: move
def create_entry(stock_data):
    posts = get_posts()
    stocks = get_all_stocks()
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
                entry_values.append({**stock, "sentiment": sentiment, "mentions": mentions})
                if not any(db_stock["_id"] == stock["symbol"] for db_stock in stocks):
                    stock_information = fetch_stock_information(stock["symbol"])
                    if stock_information:
                        insert_stock(stock_information)
                break
    today = datetime.today().strftime('%d.%m.%Y')
    entry = {"_id": today, "values": entry_values}
    insert_entry(entry)
    return entry
 



    










    











    
