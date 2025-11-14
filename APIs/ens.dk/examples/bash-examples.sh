#!/bin/bash

# Get sitewide alerts
curl https://ens.dk/sitewide_alert/load

# Search
curl "https://ens.dk/search/node?keys=test"
