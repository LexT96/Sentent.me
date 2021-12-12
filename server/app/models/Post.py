class Post:
    def __init__(self, title: str, score: int, subreddit: str, created_at: str, stock: str = None, sentiment: float = None):
        self.title = title
        self.score = score
        self.stock = stock
        self.created_at = created_at
        self.subreddit = subreddit
        self.sentiment = sentiment
    