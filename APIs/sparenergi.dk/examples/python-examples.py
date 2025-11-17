# Example of using the SparEnergi.dk API with Python

import requests

def run_examples():
    # 1. Address Autocomplete
    print("--- Address Autocomplete ---")
    autocomplete_response = requests.get("https://sparenergi.dk/address/autocomplete?q=R%C3%A5dhuspladsen%201")
    print(autocomplete_response.json())
    print("\n")

    # 2. Get Building Image
    # Note: You need an EnergyLabelSerialIdentifier for this to work.
    # We'll use the one we discovered: 311243218
    print("--- Get Building Image ---")
    image_response = requests.get("https://emoweb.dk/EMODigital/EMODigital.svc/Picture/311243218")
    with open("building_image.jpg", "wb") as f:
        f.write(image_response.content)
    print("Image saved to building_image.jpg")
    print("\n")

    # 3. Get PDF Report
    # Note: You need an EnergyLabelSerialIdentifier for this to work.
    print("--- Get PDF Report ---")
    pdf_response = requests.get("https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser?EnergyLabelSerialIdentifier=311243218")
    with open("energy_report.pdf", "wb") as f:
        f.write(pdf_response.content)
    print("PDF report saved to energy_report.pdf")
    print("\n")

if __name__ == "__main__":
    run_examples()
