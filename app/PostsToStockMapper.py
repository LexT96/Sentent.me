import json
import stanza

class PostsToStockMapper:
    def __init__(self, posts):
        self.posts = posts
    
    def __setup(self):
        stanza.download('en')
        nlp = stanza.Pipeline('en')
        return nlp

    def find_stock_in_dependencies(self,dependencies):
        words = dependencies.words
        res = ""
        for word in words:
            if word.deprel == "obj":
                return word.text
            if word.deprel == "nsubj" and word.xpos == "NNP":
                res = word.text
        return res

    def map_titles_to_stocks(self):
        nlp = self.__setup()
        titles = []
        for post in self.posts:
            titles.append(getattr(post,"title"))
        doc = nlp(". ".join(titles))
        for i in range(len(titles)):
            dependencies = doc.sentences[i]
            obj = self.find_stock_in_dependencies(dependencies)
            nsubj = self.find_stock_in_dependencies(dependencies)
            post = self.posts[i]
            if obj is not None:
                setattr(post,"stock",obj)
                continue
            if nsubj is not None:
                setattr(post,"stock",nsubj)
                print(post)
                continue
            self.posts.remove(post)
        return self.posts


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
