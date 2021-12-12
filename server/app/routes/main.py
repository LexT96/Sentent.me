from flask import jsonify
from app import app
import json, requests, os
from app.services.stock_api_service import fetch_tickers_for_entry_values
from app.services.db_service import get_all_stocks
from app.services.entry_service import get_entries, create_entry
from collections import defaultdict

@app.route("/stocks", methods=['GET'])
def handle_get_stocks():
    stocks = get_all_stocks()
    return jsonify(stocks)

@app.route("/entries", methods=['GET'])
def handle_get_entries():
    entries = get_entries()
    return jsonify(entries)

@app.route("/groups", methods=['GET'])
def handle_get_groups():
    # today = []
    # week = []
    # month = []
    # entries = get_entries()
    # for idx, entry in enumerate(entries):
    #     if idx < 1:
    #         today.append(entry["values"])
    #     if idx < 7:
    #         week.append(entry["values"])
    #     if idx < 30:
    #         month.append(entry["values"])
    # weekly_values = defaultdict(list)
    # for day in week:
    #     for value in day:
    #         weekly_values[value["symbol"]].append({**value, "date": entry["_id"]})
    # weekly_objects = []
    # weekly_object = {}
    # for key, value in weekly_values.items():
    #     last_day = value[-1]
    #     first_price = float(value[0]["price"][1:])
    #     last_price = float(last_day["price"][1:])
    #     average_sentiment = 0
    #     mentions = 0
    #     for day_value in weekly_values[key]:
    #         average_sentiment += day_value["sentiment"]
    #         mentions += day_value["mentions"]
    #     average_sentiment = average_sentiment / len(weekly_values[key])
    #     sentiment = average_sentiment * 100
    #     if len(value) > 1:
    #         price_change = last_price - first_price
    #         price_percent_change = price_change / first_price
    #     else:
    #         price_change = float(last_day["priceChange"])
    #         if len(last_day["pricePercentChange"]) > 0:
    #             price_percent_change = float(last_day["pricePercentChange"][:-1])
    #         else:
    #             price_percent_change = 0
    #     weekly_object["priceChange"] = last_price - first_price
    #     weekly_object["symbol"] = key
    #     weekly_objects.append({"sentiment": sentiment, "values": value, "name": , "symbol": key, "price": last_price, "mentions": mentions,
    #                           "priceChange": price_change, "pricePercentChange": price_percent_change})
        
    # groups = {}
    # groups["today"] = today
    # groups["week"] = weekly_objects
    # groups["month"] = month
    # groups = defaultdict(list)
    # for entry in entries:
    #     for value in entry["values"]:
    #         groups[value["symbol"]].append({**value, "date": entry["_id"]})
    # mapped_groups = []
    # for key, value in groups.items():
    #     mapped_groups.append({
    #         "symbol": key,
    #         "values": value
    #     })
    # for group in mapped_groups:
    #     for idx, value in enumerate(group["values"]):
    #         if idx < 2:
    #             today.append(value)
    #         if idx < 8:
    #             week.append(value)
    #         if idx < 31:
    #             month.append(value)
    return jsonify({})

@app.route('/fetch', methods=['GET'])
def fetch():
    stocks = fetch_tickers_for_entry_values()
    entry = create_entry(stocks)
    if os.environ["NETLIFY_REBUILD_HOOK"]:
        rebuild_netlify()
    return entry


# triggers a webhook to rebuild the netlify web-app
def rebuild_netlify():
    request = requests.post(os.environ['NETLIFY_REBUILD_HOOK'])
    if request.status_code != 200:
        print ("Error rebuilding netlify")



    










    











    
