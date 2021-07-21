from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import stanza
# function to print sentiments
# of the sentence.

class SentimentAnalyzer:

    def __get_vader_sentiment_of_title(self,title):        
        sid_obj = SentimentIntensityAnalyzer()
        sentiment_dict = sid_obj.polarity_scores(title)
        compound = sentiment_dict['compound']
        return compound
    
    def get_sentiment_of_posts(self,posts):
        nlp = stanza.Pipeline(lang='en', processors='tokenize,sentiment')
        titles = []
        for post in posts:
            titles.append(post.title)
        doc = nlp(".".join(titles))
        for i in range(len(posts)):
            post = posts[i]
            vader_sentiment = self.__get_vader_sentiment_of_title(getattr(post,"title"))
            # stanza_sentiment = doc.sentences[i].sentiment
            # print("Vader:" + str(vader_sentiment))
            # print("Stanza:" + str(stanza_sentiment))
            # combined_sentiment = (vader_sentiment + stanza_sentiment) / 2
            setattr(post,"sentiment",vader_sentiment)
        return posts

            
        # print("sentence was rated as ", sentiment_dict['neg']*100, "% Negative")
        # print("sentence was rated as ", sentiment_dict['neu']*100, "% Neutral")
        # print("sentence was rated as ", sentiment_dict['pos']*100, "% Positive")


        # positive sentiment: compound score >= 0.05
        # neutral sentiment: (compound score > -0.05) and (compound score < 0.05)
        # negative sentiment: compound score <= -0.05
        # print("Sentence Overall Rated As", end = " ") 

