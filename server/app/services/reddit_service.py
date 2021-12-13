from datetime import datetime, timedelta
import stanza
import praw
from app.classes.Post import Post
from collections import defaultdict
import os
from app.services.stock_api_service import fetch_all_symbols
from app.services.sentiment_service import add_sentiment_to_posts
from typing import List

# contains the searched subreddits
subreddit_names = [
    "wallstreetbets",
    "investing",
    "stocks",
    "wallstreetbetselite",
    "wallstreetbetsnew",
]

# fetches all posts that were made in the last 24 hours in the relevant subreddits
def fetch_posts():
    reddit = praw.Reddit(client_id=os.environ["PRAW_ID"], \
                     client_secret=os.environ["PRAW_SECRET"], \
                     user_agent=os.environ["PRAW_USER_AGENT"], \
                     username=os.environ["PRAW_USER"], \
                     password=os.environ["PRAW_PASSWORD"])
    posts = []

    #iterate through all subreddits
    for subredditName in subreddit_names:
        subreddit = reddit.subreddit(subredditName)
        #iterates through all submissions in the subreddit
        for submission in subreddit.new(limit=1000):
            utcPostTime = submission.created
            submissionDate = datetime.utcfromtimestamp(utcPostTime)
            currentTime = datetime.utcnow()
            submissionDelta = currentTime - submissionDate
            submissionDelta = str(submissionDelta)
            # remove submissions that are older than 24 hours
            if 'day' in submissionDelta:
                continue
            posts.append(Post(submission.title,submission.score,submission.subreddit,submission.created_utc,None,None))
            # iterates through comments in the submission (max 32 * 20 comments)
            submission.comments.replace_more(limit=20)
            for comment in submission.comments:
                commentTitle = comment.body
                commentScore = comment.score
                commentSub = comment.subreddit
                commentUTC = comment.created_utc
                posts.append(Post(commentTitle, commentScore, commentSub, commentUTC, None, None))
    return posts

def __setup_stanza():
    stanza.download('en')
    nlp = stanza.Pipeline('en')
    return nlp

# finds the potential stock in a sentence
def __find_symbol_in_sentence(symbol_list: List[str], sentence: str):
    words = sentence.words
    # if the post does not contain a potential obj or nsubj stock,
    # take the noun that matches a stock
    fallback_stock = None
    for i in range(len(words)):
        word = words[i]
        # if the sentence contains a cashtag immediately breaks the loop and returns the symbol
        # checks if the current word is $ and if the 
        # sentence has a following word and if the following word is a potential cashtag
        if word.text == "$" and i < len(words) - 1 and __is_cashtag(words[i+1]) and word.text in symbol_list:
            return words[i+1].text
        # checks if the current word is an object and is a stock symbol
        if word.deprel == "obj" and word.text in symbol_list:
            return word.text
        # checks if the current word is an nominal subject, a proper noun (singular) and is included in the symbol list
        if word.deprel == "nsubj" and word.xpos == "NNP" and word.text in symbol_list:
            return word.text
        if word.upos == "PROPN" and word.text in symbol_list:
            fallback_stock = word.text
    if fallback_stock is not None:
        return fallback_stock
    return None

# checks if the word is a cashtag (e.g. $TSLA)
def __is_cashtag(word: str):
    word = word.text
    return len(word) >= 1 and len(word) <= 6 and not any(char.isdigit() for char in word)

# takes all posts and adds the stock symbol to them if it can be found in the sentence
def add_stock_to_posts(posts: List[Post]):
    symbols = fetch_all_symbols()
    nlp = __setup_stanza()
    for post in posts:
        # splits every sentence in the post into a list of words including their types
        doc = nlp(post.title)
        for sentence in doc.sentences:
            symbol = __find_symbol_in_sentence(symbols, sentence)
            if symbol is not None:
                post.stock = symbol
    return posts

# iterates through all posts and returns a dictionary with the stock symbol as key and
# a list of the relevant posts as value
def group_posts_by_stock(posts: List[Post]):
    groups = defaultdict(list)
    for post in posts:
        groups[post.stock].append(post)
    return list(groups.values())

# return all stocks including their stock symbol
def     get_posts():
    posts = fetch_posts()
    posts = add_stock_to_posts(posts)
    posts = add_sentiment_to_posts(posts)
    return posts








    

