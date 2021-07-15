from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
# function to print sentiments
# of the sentence.
def sentiment_scores(sentence):
 
    sid_obj = SentimentIntensityAnalyzer()
    sentiment_dict = sid_obj.polarity_scores(sentence)
     
    # print("sentence was rated as ", sentiment_dict['neg']*100, "% Negative")
    # print("sentence was rated as ", sentiment_dict['neu']*100, "% Neutral")
    # print("sentence was rated as ", sentiment_dict['pos']*100, "% Positive")

    compound = sentiment_dict['compound']

    # positive sentiment: compound score >= 0.05
    # neutral sentiment: (compound score > -0.05) and (compound score < 0.05)
    # negative sentiment: compound score <= -0.05
    # print("Sentence Overall Rated As", end = " ") 
    if sentiment_dict['compound'] >= 0.05 :
        return "+"
    elif sentiment_dict['compound'] <= - 0.05 :
        return "-"
    return "="
