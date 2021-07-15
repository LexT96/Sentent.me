from app.get_post_values import get_post_values

def test_score_mapping():
    test_data = {"data": [{"title": "This stock sucks"}, {"title": "This stock is great"}]}
    scores = get_post_values(test_data)
    print (scores)
    assert scores["This stock sucks"] == "-"
    assert scores["This stock is great"] == "+"
