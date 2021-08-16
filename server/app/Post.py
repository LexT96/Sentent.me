class Post:
    def __init__(self, title, score, subreddit, created_at, stock = None, sentiment = None):
        self.title = title
        self.score = score
        self.stock = stock
        self.created_at = created_at
        self.subreddit = subreddit
        self.sentiment = sentiment
    def __str__(self):
        if self.stock:
            return self.title + "," + str(self.score) + "," + self.stock
        return self.title + "," + str(self.score)
    