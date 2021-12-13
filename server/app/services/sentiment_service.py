from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from app.classes.Post import Post
from typing import List

def __get_vader_sentiment_of_title(title: str):        
    sid_obj = SentimentIntensityAnalyzer()
    sentiment_dict = sid_obj.polarity_scores(title)
    compound = sentiment_dict['compound']
    return compound

def add_sentiment_to_posts(posts: List[Post]):
    for post in posts:
        vader_sentiment = __get_vader_sentiment_of_title(post.title)
        post.sentiment = vader_sentiment
    return posts

# calculates the average sentiment for a list of posts
def calculate_average_sentiment(posts: List[Post]):
    sentiment_sum = 0
    for post in posts:
        sentiment_sum += post.sentiment
    average = round(sentiment_sum/len(posts),2)
    return average

