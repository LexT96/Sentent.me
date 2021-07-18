import json
import stanza

class StockToTitleMapper:
    def __init__(self, title):
        self.title = title

    def __str__(self):
        return self.title + "belongs to: " + self.stock
    
    def find_object_in_title(self):
        stanza.download('en')
        nlp = stanza.Pipeline('en')
        doc = nlp(self.title)
        sentence = doc.sentences[0]
        words = sentence.words
        for word in words:
            if word.deprel == "nsubj":
                return word.text
        return ""




# def find_matching_stock(title):
#     f = open("app/assets/stock_symbols.json")
#     stocks = json.load(f)
#     words = title.split(" ")
#     for stock in stocks:
#         for word in words:
#             upperCaseWord = word.upper()
#             if upperCaseWord == stock["symbol"]:
#                 return stock
#     return ""
