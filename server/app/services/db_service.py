import pymongo
from datetime import datetime
import os

def __setup():
    client = pymongo.MongoClient(f'mongodb+srv://root:{os.environ["MONGO_PASSWORD"]}@{os.environ["MONGO_ADDRESS"]}/stonks?retryWrites=true&w=majority')
    db = client.stonks
    return db

def get_all_stocks():
    db = __setup()
    stocks = list(db.stocks.find({}))
    return stocks

def insert_stock(stock):
    db = __setup()
    stocks = db.stocks
    result = stocks.insert_one(stock)
    return result

def insert_stocks(stocks):
    db = __setup()
    result = db.stocks.insert_many(stocks,False)
    return result

def insert_entry(entry):
    db = __setup()
    result = db.entries.insert(entry)
    return result

def get_entries():
    db = __setup()
    entries = list(db.entries.find({}))
    return entries





