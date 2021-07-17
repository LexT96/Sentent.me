class Post:
    def __init__(self, title, score):
        self.title = title
        # self.stock = stock
        self.score = score
        # self.sentiment = sentiment
    def __str__(self):
        return self.title + " " + str(self.score)
    