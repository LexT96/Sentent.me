from typing import List
from app.Post import Post
from app.PostFetcher import *

def test_fetch():
    p = PostFetcher("wallstreetbets")
    titles_and_scores = p.get_title_and_score_list()
    assert len(titles_and_scores) == 50
    for entry in titles_and_scores:
        assert hasattr(entry, "title") and hasattr(entry, "score")
