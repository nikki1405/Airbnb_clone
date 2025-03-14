import scrapy
import json
import requests
from airbnb_scraper.items import AirbnbListing

class AirbnbSpider(scrapy.Spider):
    name = "airbnb"
    allowed_domains = ["airbnb.com"]
    
    def __init__(self, location="New York", checkin="2024-04-01", checkout="2024-04-05", guests=2, *args, **kwargs):
        super(AirbnbSpider, self).__init__(*args, **kwargs)
        self.start_urls = [
            f"https://www.airbnb.com/s/{location}/homes?checkin={checkin}&checkout={checkout}&adults={guests}"
        ]
    
    def parse(self, response):
        listings = response.css("div._8ssblpx")  # Adjust CSS selector based on Airbnb's website structure

        for listing in listings:
            item = AirbnbListing()
            item["title"] = listing.css("span._bzh5lkq::text").get()
            item["location"] = listing.css("span._167qordg::text").get()
            item["address"] = listing.css("div._1tanv1h::text").get()
            item["price_per_night"] = listing.css("span._1p7iugi::text").get()
            item["currency"] = "USD"  # Modify based on location
            item["ratings"] = listing.css("span._10fy1f8::text").get()
            item["num_reviews"] = listing.css("span._a7a5sx::text").get()
            item["image_urls"] = listing.css("img::attr(src)").getall()
            item["property_type"] = listing.css("div._b14dlit::text").get()
            item["description"] = "Airbnb listing"  # Scrape this if available
            item["amenities"] = []  # Scrape amenities if available
            item["host_info"] = {}  # Scrape host details if available

            yield item

            # Sending data to Django backend via POST request
            api_url = "http://127.0.0.1:8000/api/add-listing/"
            headers = {"Content-Type": "application/json"}
            response = requests.post(api_url, json=dict(item), headers=headers)
            print(response.json())

        # Handle pagination (if available)
        next_page = response.css("a._za9j7e::attr(href)").get()
        if next_page:
            yield response.follow(next_page, self.parse)
