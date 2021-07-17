from app.get_post_values import get_post_values
from app.post_fetcher import fetch_sub

# def test_score_mapping():
#     test_data = {200, {"data": [{"title": "This stock sucks"}, {"title": "This stock is great"}]}}
#     scores = get_post_values(test_data)
#     assert scores["This stock sucks"] == "-"
#     assert scores["This stock is great"] == "+"

# def test_score_mapping_with_real_data():
#     test_data = fetch_sub("wallstreetbets")
#     scores = get_post_values(test_data)
#     # print(scores)
#     assert scores is not None

