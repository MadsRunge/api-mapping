#!/bin/bash

# Get posts
curl https://traeinfo.dk/wp-json/wp/v2/posts

# Get pages
curl https://traeinfo.dk/wp-json/wp/v2/pages

# Get media
curl https://traeinfo.dk/wp-json/wp/v2/media

# AJAX endpoint
curl -X POST -d "action=mdf_search_panel" https://traeinfo.dk/wp-admin/admin-ajax.php

# WooCommerce Fragments
curl -X POST https://traeinfo.dk/?wc-ajax=get_refreshed_fragments
