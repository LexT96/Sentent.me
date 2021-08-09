from flask import jsonify
from requests.models import stream_decode_response_unicode
from app import app
from app.services.stock_api_service import fetch_tickers
from app.services.db_service import insert_stocks, get_all_stocks, insert_prices_for_today

@app.route('/', methods=['GET'])
def index():
    return "Hello"
    # return jsonify(books)

@app.route("/stocks", methods=['GET'])
def get_stocks():
    stocks = get_all_stocks()
    return jsonify(stocks)


@app.route('/fetch')
def fetch():
    stocks = fetch_tickers()
    # insert_stocks(stocks)
    insert_prices_for_today(stocks)
    return "Hello World"




    
