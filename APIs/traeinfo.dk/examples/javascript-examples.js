// Get posts
fetch("https://traeinfo.dk/wp-json/wp/v2/posts")
  .then(response => response.json())
  .then(data => console.log(data));

// Get pages
fetch("https://traeinfo.dk/wp-json/wp/v2/pages")
    .then(response => response.json())
    .then(data => console.log(data));

// Get media
fetch("https://traeinfo.dk/wp-json/wp/v2/media")
    .then(response => response.json())
    .then(data => console.log(data));

// AJAX endpoint
fetch("https://traeinfo.dk/wp-admin/admin-ajax.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "action=mdf_search_panel"
})
    .then(response => response.text())
    .then(data => console.log(data));

// WooCommerce Fragments
fetch("https://traeinfo.dk/?wc-ajax=get_refreshed_fragments", {
    method: "POST"
})
    .then(response => response.json())
    .then(data => console.log(data));
