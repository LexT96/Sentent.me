import pymongo
from datetime import datetime, timedelta


def __setup():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client.stonks
    return db

def get_all_sentiments():
    db = __setup()
    return list(db.sentiments.find())

def insert_one_sentiment(post):
    db = __setup()
    sentiments = db.sentiments
    result = sentiments.insert_one(vars(post))
    return result

def insert_many_sentiments(posts):
    db = __setup()
    sentiments = db.sentiments
    post_dicts = []
    for post in posts:
        post_dicts.append(vars(post))
    result = sentiments.insert_many(post_dicts)
    return result

def remove_one_sentiment(post):
    db = __setup()
    entry = vars(post)
    result = db.sentiments.remove(entry)
    return result

def get_sentiments_for_stock(stock):
    db = __setup()
    sentiments = db.sentiments.find({stock: stock})
    return sentiments

def get_yesterdays_sentiment_for_stock(stock):
    db = __setup()
    yesterday = int((datetime.now() - timedelta(1)).replace(hour=18, minute=0, second=0, microsecond=0).timestamp())
    sentiments = db.sentiments.find({"stock": stock, "created_at": { "$gt": yesterday }})
    total_sentiment = 0
    if sentiments is not None:
        for sentiment in sentiments:
            total_sentiment += sentiment.sentiment
        total_sentiment /= len(sentiments)
        return total_sentiment
    return None






