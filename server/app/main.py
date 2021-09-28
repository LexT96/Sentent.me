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

# @app.route('/fetch')
# def fetch():
#     stocks = fetch_tickers()
#     create_entry(stocks)
#     return "Hello World"

# @app.route("/update")
# def up():
#     update_stock_values()
#     return "Done"


    










    
