#!/bin/bash

# Example of using the SparEnergi.dk API with curl

# 1. Address Autocomplete
echo "--- Address Autocomplete ---"
curl "https://sparenergi.dk/address/autocomplete?q=R%C3%A5dhuspladsen%201"
echo -e "\n"

# 2. Get Building Image
# Note: You need an EnergyLabelSerialIdentifier for this to work.
# We'll use the one we discovered: 311243218
echo "--- Get Building Image ---"
curl -o building_image.jpg "https://emoweb.dk/EMODigital/EMODigital.svc/Picture/311243218"
echo "Image saved to building_image.jpg"
echo -e "\n"

# 3. Get PDF Report
# Note: You need an EnergyLabelSerialIdentifier for this to work.
echo "--- Get PDF Report ---"
curl -o energy_report.pdf "https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser?EnergyLabelSerialIdentifier=311243218"
echo "PDF report saved to energy_report.pdf"
echo -e "\n"
