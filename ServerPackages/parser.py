from enum import Enum
import json
from bs4 import BeautifulSoup
import requests

sberbank_url = 'https://bincheck.io/ru/ru/sberbank-of-russia'
raif_url = 'https://bincheck.io/ru/ru/ao-raiffeisenbank'
gazprom_url = 'https://bincheck.io/ru/ru/gazprombank-(joint-stock-company)'
tinkoff_url = 'https://bincheck.io/ru/ru/tinkoff-bank'
mts_url = 'https://bincheck.io/ru/ru/pjsc-mts-bank'

urls = [
    sberbank_url,
    raif_url,
    gazprom_url,
    tinkoff_url,
    mts_url
]

banksNames = Enum("banksNames", ['sberbank','raif','gazprom','tinkoff','mts'])



def parse(resp: requests.Response, name: str) -> dict:
    
    soup = BeautifulSoup(resp.text, 'html.parser')

    div = soup.find('div', class_="overflow-x-auto")
    table = div.find('tbody', class_='text-base antialiased divide-y divide-slate-50 dark:divide-slate-600')
    rows = table.find_all("tr")

    bin_list = []

    for col in rows:
        td = col.find('td')
        b = td.find('b')
        a = b.find('a')
        text = str(a.text).replace(" ↗", "")
        bin_list.append(text)
        print(text)

    bin_store[name] = bin_list
    
    return bin_store

bin_store = {}

for url, name in zip(urls, banksNames):
    bin_store = parse(requests.get(url), name.name)


with open("bins.json", "w") as file:
    file.write(json.dumps(bin_store, indent=4))
    
# bins = soup.find_all('a', class_=" hover:text-blue-500 dark:hover:text-blue-500 after:content-['_↗']")
# for bin in bins:
#     print(bin.text)