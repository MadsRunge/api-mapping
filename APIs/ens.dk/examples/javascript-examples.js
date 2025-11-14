// Get sitewide alerts
fetch("https://ens.dk/sitewide_alert/load")
  .then(response => response.json())
  .then(data => console.log(data));

// Search
fetch("https://ens.dk/search/node?keys=test")
    .then(response => response.text())
    .then(data => console.log(data));
