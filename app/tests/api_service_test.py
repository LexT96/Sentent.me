from app.services.api_service import fetch_posts, map_titles_to_stocks
from app.Post import Post
def test_post_fetching():
    posts = fetch_posts()
    assert len(posts) == 10

def test_stock_mapping():
    posts = [Post("Amazon is great", 223),
        Post("The worst stock right now is GME", 223),
        Post("Whats Bill doing with Microsoft rn?", 223),
        Post("$BB is going crazy like my ex, it's already at $67", 696)]
    mapped = map_titles_to_stocks(posts)
    assert mapped[0].stock == "Amazon"
    assert mapped[1].stock == "GME"
    assert mapped[2].stock == "Microsoft"
    assert mapped[3].stock == "BB"
    

