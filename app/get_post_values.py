from .analyzer import sentiment_scores
from .Post import Post

def get_post_values(response_json):
    data = response_json["data"]
    title_scores = {}
    #print(data[0]["title"])
    for post in data:
        title = post["title"]
        score = post["score"]
        p = Post(title,score)
        # title_scores[post["title"]] = sentiment_scores(post["title"])
    return title_scores