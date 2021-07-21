from app.Post import Post
import requests
import json 

class PostFetcher:
    def __init__(self,subname):
        self.subname = subname

    def __fetch_sub(self):
        tries = 0
        while tries <= 3:
            res = requests.get(f"https://api.pushshift.io/reddit/search/submission/?subreddit={self.subname}&sort_type=score&sort=desc&size=50&before=1626297957&end=1626384357")
            if res.status_code == 200:
                response = json.loads(res.text)
                return response["data"]
            tries += 1
        return None

    def get_title_and_score_list(self):
        posts = self.__fetch_sub()
        title_and_score_list = []
        for post in posts:
            p = Post(post["title"], post["score"])
            title_and_score_list.append(p)
        return title_and_score_list
