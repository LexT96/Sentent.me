from psaw import PushshiftAPI
from datetime import datetime, timedelta
import stanza
from app.models.Post import Post
from collections import defaultdict
import praw
import os

def fetch_posts():
    reddit = praw.Reddit(client_id=os.environ["PRAW_ID"], \
                     client_secret=os.environ["PRAW_SECRET"], \
                     user_agent=os.environ["PRAW_USER_AGENT"], \
                     username=os.environ["PRAW_USER"], \
                     password=os.environ["PRAW_PASSWORD"])
    posts = []
    subredditNames = ["wallstreetbets", "investing", "stocks", "wallstreetbetselite", "wallstreetbetsnew", "mauerstrassenwetten"]
    for subredditName in subredditNames:
        subreddit = reddit.subreddit(subredditName)
        for submission in subreddit.new(limit=1000):
            utcPostTime = submission.created
            submissionDate = datetime.utcfromtimestamp(utcPostTime)
            currentTime = datetime.utcnow()

            submissionDelta = currentTime - submissionDate

            submissionDelta = str(submissionDelta)
            if 'day' not in submissionDelta:
                posts.append(Post(submission.title,submission.score,submission.subreddit,submission.created_utc,None,None))
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

def __find_stock_in_sentence(sentence):
    obj = None
    nsubj = None
    propn = None
    words = sentence.words
    for i in range(len(words)):
        word = words[i]
        if word.text == "$" and i < len(words) - 1 and __is_cashtag(words[i+1]):
            return words[i+1].text
        if word.deprel == "obj":
            obj = word.text
        if word.deprel == "nsubj" and word.xpos == "NNP":
            nsubj = word.text
        if word.upos == "PROPN" and word.xpos == "NNP":
            propn = word.text
    if obj is not None:
        return obj
    if nsubj is not None:
        return nsubj
    if propn is not None:
        return propn
    return None

def __is_cashtag(word):
    word = word.text
    return len(word) >= 1 and len(word) <= 6 and not any(char.isdigit() for char in word)

def map_titles_to_stocks(posts):
    nlp = __setup_stanza()
    for post in posts:
        doc = nlp(post.title)
        stock = __find_stock_in_sentence(doc.sentences[0])
        if stock is not None:
            post.stock = stock
    return posts

def group_posts_by_stock(posts):
    groups = defaultdict(list)
    for post in posts:
        groups[post.stock].append(post)
    return list(groups.values())

def get_posts():
    posts = fetch_posts()
    posts = map_titles_to_stocks(posts)
    return posts








    

