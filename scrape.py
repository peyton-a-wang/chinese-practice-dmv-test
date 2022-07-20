import requests
from bs4 import BeautifulSoup, SoupStrainer
import pandas as pd


def scrape_q(q_num):
    address = "https://pass-dmv-test.com/quiz-{}-zh.html".format(q_num)
    
    parse_only = SoupStrainer(attrs={'class': ["card-title", "list-group-item"]})
    soup = BeautifulSoup(requests.get(address).text, 'lxml', parse_only=parse_only)
    
    q_title = soup.find("h5").string
    q_options = [option.text.strip() for option in soup.find_all("li")]
    
    if len(q_options[0]) == 1:
        return
    
    q_tf = [option.get("value") for option in soup.find_all("input")]

    q_correct = ""
    q_wrong = []
    
    for i, option in enumerate(q_options):
        if q_tf[i] == "0":
            q_wrong.append(option)
        else:
            q_correct = option

    return q_title, q_correct, q_wrong


def write_qs(filename):
    df = pd.DataFrame(columns=["q", "c", "w"])
    total_qs = 300

    for q_num in range(0, total_qs):
        q_elts = scrape_q(q_num+1)
        
        if q_elts:
            q_title, q_correct, q_wrong = q_elts
            df = df.append({"q": q_title, "c": q_correct, "w": q_wrong}, ignore_index=True)
    
    with open(filename, 'w', encoding='utf-8') as outfile:
        df.to_json(outfile, force_ascii=False, orient="records")


write_qs("questions.json")