from app.services.api_service import fetch_posts, map_titles_to_stocks, remove_posts_without_existing_stock
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

def test_stock_filtering_on_empty_stocks():
    posts = [Post("I hate this subreddit",333), Post("What is this?",999)]
    filtered_posts = remove_posts_without_existing_stock(posts)
    assert len(filtered_posts) == 0

def test_stock_filtering_on_non_existent_stocks():
    posts = [Post("$ZZZZ is great", 223, "ZZZZ"),
    Post("This is the worst stock right now", 223, "This"),
    Post("Whats going on with $PPWW?", 223, "PPWW")]
    filtered_posts = remove_posts_without_existing_stock(posts)
    assert len(filtered_posts) == 0

def test_stock_filtering_on_existing_stocks():
    posts = [Post("$AMZN to the moon", 223, "AMZN"), 
    Post("TSLA 4 ever", 999, "TSLA"), 
    Post("PLTR is the future", 999, "PLTR")]
    filtered_posts = remove_posts_without_existing_stock(posts)
    assert len(filtered_posts) == 3


    

