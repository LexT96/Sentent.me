from app.analyzer import sentiment_scores

def test_positive():
    sentence = "TSLA is great"
    score = sentiment_scores(sentence)
    assert score == "+"

def test_negative():
    sentence = "GME is going to lose you a ton of money"
    score = sentiment_scores(sentence)
    assert score == "-"

def test_neutral():
    sentence = "BYD is unpredictable right now"
    score = sentiment_scores(sentence)
    assert score == "="

def test_double_negative():
    sentence = "There is no way AMZ is not going down"
    score = sentiment_scores(sentence)
    assert score == "-"