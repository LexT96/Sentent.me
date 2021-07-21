from app.PostsToStockMapper import *

from app.Post import Post


def true():
    assert True == True

def test_stock_mapping():
    p = Post("GME is great", 999)
    p2 = Post("I think Amazon is fantastic" , 333)
    p3 = Post("Bill Gates really likes Microsoft" , 333)
    list = [p,p2,p3]
    mapper = PostsToStockMapper(list)
    posts = mapper.map_titles_to_stocks()
    assert getattr(posts[0],"stock") == "GME"
    assert getattr(posts[1],"stock") == "Amazon"
    assert getattr(posts[2],"stock") == "Microsoft"





# def test_stock_mapping2():
#     m = StockToTitleMapper("GME might be the worst stock out there")
#     nsubj = m.find_object_in_title()
#     assert nsubj == "GME"
