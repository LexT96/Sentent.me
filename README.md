![CI](https://github.com/LexT96/pyStonks/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/LexT96/pyStonks/branch/main/graph/badge.svg?token=TNN1YQK16S)](https://codecov.io/gh/LexT96/pyStonks) 

# PyStonks
PyStonks analyzes the sentiment of the top posts of the most relevant investing subreddits if they relate to a stock. The backend is built using python and provides a REST-Api built in flask that is served to a ReactJs frontend.

## Workflow
1. Every 24 hours a cronjob is executed to retrieve the titles and scores of the top 100 posts from the relevant subreddits using the <a href ="https://pushshift.io/">pushshift api</a>.
2. The relationship between the words inside of a single title get analyzed to find the nominal subject (which in most cases equals the name of the relevant stock). This is done using the Stanford library <a href="https://github.com/stanfordnlp/stanza">stanza</a>.
3. To find the relevant stock a .json file containing the symbols of all of the stocks traded at the NYSE is parsed and the stock symbols get compared to the the found nominal subject of the title.
4. If the nsubj could not be mapped to a stock the title is filtered out.
5. If a nsubj could be mapped to a stock the sentiment of the title is now analyzed using the <a href="https://github.com/cjhutto/vaderSentiment">VADER (Valence Aware Dictionary and sEntiment Reasoner) sentiment tool</a>. The sentiment score is mapped to "+" (positive sentiment), "=" (neutral sentiment) or "-" (negative sentiment). If you are intered in more information about the used algorithm I would recommend reading the following paper:
>Hutto, C.J. & Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. Eighth   >International Conference on Weblogs and Social Media (ICWSM-14). Ann Arbor, MI, June 2014.
6. tbd


## Major ToDo
1. Finish MVP.
2. Add weighting for the title score.
3. Improve sentiment accuracy (use a combination of the stanza sentiment and the vader algorithm and work with real values instead of classifing them into "+", "=" or "-".
4. Add cryptocurrencies.

## Getting Started
1. Make sure you have python 3.9.6+ and pip installed on your machine.
2. Clone this repository.
``` 
git clone https://github.com/LexT96/pyStonks
```
3. Navigate to your local version of this repo and create a virtual environment.
```
cd pystonks && python3 -m venv venv
```
4. Start your virtual environment and install the dependencies found in the requirements.txt
```
source venv/bin/activate
pip install -r requirements.txt 
```
5. Run the tests
```
pytest -s
```
