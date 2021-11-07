![CI](https://github.com/LexT96/pyStonks/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/LexT96/pyStonks/branch/main/graph/badge.svg?token=TNN1YQK16S)](https://codecov.io/gh/LexT96/pyStonks) [![Netlify Status](https://api.netlify.com/api/v1/badges/d84f1d0e-08ae-4c42-a30c-9b1294c9dad9/deploy-status)](https://app.netlify.com/sites/cranky-agnesi-a8667c/deploys)

<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="80px"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="60px"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" width="120px">
    <img src="https://webimages.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png?auto=format%2Ccompress" width="140px"/>
</p>

# Sentent.me
Sentent.me analyzes the sentiment of the top posts of the most relevant investing subreddits if they relate to a stock. The backend is built using python and provides a REST-Api built in flask that is served to a ReactJs frontend.

## Workflow
1. Every 24 hours a cronjob is executed to scrape the titles and scores of all submissions and their comments from the relevant subreddits.
2. The relationship between the words inside of a single title gets analyzed to filter out posts that don't relate to a specific stock and to retrieve the name of the stock. This is done using the Stanford library <a href="https://github.com/stanfordnlp/stanza">stanza</a>.
3. After this all remaining posts will be analyzed regarding their sentiment towards the stock using the <a href="https://github.com/cjhutto/vaderSentiment">VADER (Valence Aware Dictionary and sEntiment Reasoner) sentiment tool</a>. The sentiment score ranges from -100 (very negative) to 100 (very positive). If you are intered in more information about the used algorithm I would recommend reading the following paper:
>Hutto, C.J. & Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. Eighth   >International Conference on Weblogs and Social Media (ICWSM-14). Ann Arbor, MI, June 2014.
5. Now the posts will be grouped using the stock and the average sentiment towards the stock.
6. In the last step the stock groups and their values are provided to the NextJS frontend which uses them to generate graphs using React Vis.


## Major ToDos
1. Better mobile layout
1. Add Cryptos
2. Train own machine learning model

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
