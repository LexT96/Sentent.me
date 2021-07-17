import requests
import json 

def fetch_sub(name):
    res = requests.get(f"https://api.pushshift.io/reddit/search/submission/?subreddit={name}&sort_type=score&sort=desc&size=50&before=1626297957&end=1626384357")
    assert res.status_code == 200
    response = json.loads(res.text)
    return response 