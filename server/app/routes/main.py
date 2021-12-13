from flask import jsonify
from app import app
import json, requests, os
from app.services.stock_api_service import fetch_tickers_for_entry_values
from app.services.db_service import get_all_stocks, get_entries
from app.services.entry_service import create_entry
from collections import defaultdict

@app.route("/stocks", methods=['GET'])
def handle_get_stocks():
    stocks = get_all_stocks()
    return jsonify(stocks)

@app.route("/entries", methods=['GET'])
def handle_get_entries():
    entries = get_entries()
    return jsonify(entries)

@app.route('/fetch', methods=['GET'])
def fetch():
    stocks = fetch_tickers_for_entry_values()
    entry = create_entry(stocks)
    return entry





    










    











    
