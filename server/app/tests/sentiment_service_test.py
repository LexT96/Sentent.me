from app.Post import Post
from app.services.sentiment_service import add_sentiment_to_posts, calculate_average_sentiment


def test_positive():
    p = Post("TSLA is great",999, "", "")
    p2 = Post("AUDVF is the best stock ever",999, "", "")
    posts = add_sentiment_to_posts([p,p2])
    assert posts[0].sentiment >= 0.05
    assert posts[1].sentiment >= 0.05

def test_negative():
    p = Post("TSLA = :(",999, "", "")
    p2 = Post("Investing in AUDVF is a terrible idea",999, "", "")
    posts = add_sentiment_to_posts([p,p2])
    assert posts[0].sentiment <= -0.05
    assert posts[1].sentiment <= -0.05

def test_neutral():
    p = Post("I don't really know about TSLA",999, "", "")
    p2 = Post("AUDVF is unpredictable right now",999, "", "")
    posts = add_sentiment_to_posts([p,p2])
    assert posts[0].sentiment > -0.05 and posts[1].sentiment < 0.05
    assert posts[0].sentiment > -0.05 and posts[1].sentiment < 0.05

def test_average_sentiment():
    posts = [Post("Test Post", 999, "", "", "", 0.04), 
    Post("Test Post", 999, "", "", "", -0.04), 
    Post("Test Post", 999, "", "", "", 0.02), 
    Post("Test Post", 999, "", "", "", -0.02)]
    assert calculate_average_sentiment(posts) == 0.0