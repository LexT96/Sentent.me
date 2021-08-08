from app.services.db_service import get_all_sentiments, insert_one_sentiment, insert_many_sentiments, remove_one_sentiment
from app.Post import Post

# def test_get_all_sentiments():
#     print(get_all_sentiments())

def test_insert_one_sentiment():
    post = Post("AMAZN is AMAZing", 999, "AMAZN", 0.05, 12412213)
    result = insert_one_sentiment(post)
    assert result.acknowledged == True

def test_get_all_sentiments():
    sentiments = get_all_sentiments()
    assert list(sentiments)

def test_insert_many_sentiments():
    posts = [Post("AMAZN is AMAZing", 999, "AMAZN", 0.05), Post("BB rocks", 999, "BB", -0.05)]
    result = insert_many_sentiments(posts)
    assert result.acknowledged == True

def test_remove_one_sentiment():
    pass
    



