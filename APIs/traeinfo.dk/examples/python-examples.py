import requests

# Get posts
response = requests.get("https://traeinfo.dk/wp-json/wp/v2/posts")
print(response.json())

# Get pages
response = requests.get("https://traeinfo.dk/wp-json/wp/v2/pages")
print(response.json())

# Get media
response = requests.get("https://traeinfo.dk/wp-json/wp/v2/media")
print(response.json())

# AJAX endpoint
response = requests.post("https://traeinfo.dk/wp-admin/admin-ajax.php", data={"action": "mdf_search_panel"})
print(response.text)

# WooCommerce Fragments
response = requests.post("https://traeinfo.dk/?wc-ajax=get_refreshed_fragments")
print(response.json())
