from app.StockToTitleMapper import StockToTitleMapper

def test_stock_mapping():
    m = StockToTitleMapper("Tesla is great")
    nsubj = m.find_object_in_title()
    assert nsubj == "Tesla"

def test_stock_mapping2():
    m = StockToTitleMapper("GME might be the worst stock out there")
    nsubj = m.find_object_in_title()
    assert nsubj == "GME"
