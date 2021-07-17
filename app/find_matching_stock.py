import json

def find_matching_stock(title):
    f = open("app/assets/stock_symbols.json")
    stocks = json.load(f)
    words = title.split(" ")
    if "is" in words:
        words.remove("is")
    for stock in stocks:
        for word in words:
            upperCaseWord = word.upper()
            if upperCaseWord == stock["symbol"]:
                return stock
    return ""
