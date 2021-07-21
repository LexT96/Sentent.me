from app.Post import Post
from app.SentimentAnalyzer import SentimentAnalyzer


def test_positive():
    p = Post("TSLA is great",999)
    p2 = Post("AUDVF is the best stock ever",999)
    analyzer = SentimentAnalyzer()
    posts = analyzer.get_sentiment_of_posts([p,p2])
    assert getattr(posts[0],"sentiment") >= 0.05
    assert getattr(posts[1],"sentiment") >= 0.05

def test_negative():
    p = Post("TSLA = :(",999)
    p2 = Post("Investing in AUDVF is a terrible idea",999)
    analyzer = SentimentAnalyzer()
    posts = analyzer.get_sentiment_of_posts([p,p2])
    assert getattr(posts[0],"sentiment") <= -0.05
    assert getattr(posts[1],"sentiment") <= -0.05

def test_neutral():
    p = Post("I don't really know about TSLA",999)
    p2 = Post("AUDVF is unpredictable right now",999)
    analyzer = SentimentAnalyzer()
    posts = analyzer.get_sentiment_of_posts([p,p2])
    assert getattr(posts[0],"sentiment") > -0.05 and getattr(posts[0],"sentiment") < 0.05
    assert getattr(posts[1],"sentiment") > -0.05 and getattr(posts[1],"sentiment") < 0.05