from psaw import PushshiftAPI
from datetime import datetime, timedelta
import json
import stanza
from app.Post import Post

def fetch_posts():
    api = PushshiftAPI()
    posts = []
    yesterday = int((datetime.now() - timedelta(1)).replace(hour=18, minute=0, second=0, microsecond=0).timestamp())
    generator = api.search_submissions(after=yesterday, 
                                subreddit='wallstreetbets',
                                filter=['title','score'],
                                limit=10)
    for submission in generator:
        posts.append(Post(submission.title,submission.score))
    return posts

def __setup_stanza():
    stanza.download('en')
    nlp = stanza.Pipeline('en')
    return nlp

def map_titles_to_stocks(posts):
    nlp = __setup_stanza()
    titles = []
    for post in posts:
        titles.append(getattr(post,"title"))
    doc = nlp(". ".join(titles))
    for i in range(len(titles)):
        sentence = doc.sentences[i]
        stock = find_stock_in_sentence(sentence)
        if stock is not None:
            setattr(posts[i],"stock",stock)
    return posts

def find_stock_in_sentence(sentence):
    obj = None
    nsubj = None
    for word in sentence.words:
        print(word)
        if word.text[0] == "$" and len(word.text) > 1:
            return word.text
        if word.deprel == "obj":
            obj = word.text
            continue
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



    

