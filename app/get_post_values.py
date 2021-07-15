from .analyzer import sentiment_scores

def get_post_values(response_json):
    data = response_json["data"]
    title_scores = {}
    for post in data:
        title_scores[post["title"]] = sentiment_scores(post["title"])
    return title_scores