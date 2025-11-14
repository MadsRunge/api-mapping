import requests

# Get sitewide alerts
response = requests.get("https://ens.dk/sitewide_alert/load")
print(response.json())

# Search
response = requests.get("https://ens.dk/search/node?keys=test")
print(response.text)
