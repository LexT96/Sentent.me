from app.services.reddit_service import add_stock_to_posts, group_posts_by_stock
from app.classes.Post import Post

def test_stock_mapping():
    posts = [
        Post("AMZN is great", 223, "", ""),
        Post("I believe that GME is going to be huge", 223, "", ""),
        Post("What's your take on BB?", 696, "", ""),
        Post("$RXT Rackspace has a good Q2 but stock still goes down -15%. "
            "Institution manipulation again!",3,"","")
            ]
    mapped = add_stock_to_posts(posts)
    assert mapped[0].stock == "AMZN"
    assert mapped[1].stock == "GME"
    assert mapped[2].stock == "BB"
    assert mapped[3].stock == "RXT"

def test_stock_grouping():
    posts = [Post("$AMZN to the moon", 223, "", "", "AMZN"), 
    Post("$AMZN 4 ever", 999, "", "", "AMZN"), 
    Post("PLTR is the future", 999, "", "", "PLTR")]
    grouped_posts = group_posts_by_stock(posts)
    assert len(grouped_posts) == 2
    assert grouped_posts[0] == [posts[0],posts[1]]
    assert grouped_posts[1] == [posts[2]]



    

