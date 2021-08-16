from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def __get_vader_sentiment_of_title(title):        
    sid_obj = SentimentIntensityAnalyzer()
    sentiment_dict = sid_obj.polarity_scores(title)
    compound = sentiment_dict['compound']
    return compound

def add_sentiment_to_posts(posts):
    for post in posts:
        vader_sentiment = __get_vader_sentiment_of_title(post.title)
        post.sentiment = vader_sentiment
    return posts

def calculate_average_sentiment(posts):
    sentiment_sum = 0
    for post in posts:
        sentiment_sum += post.sentiment
    average = sentiment_sum/len(posts)
    return average

