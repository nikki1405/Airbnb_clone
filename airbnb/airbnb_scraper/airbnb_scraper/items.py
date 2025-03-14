import scrapy

class AirbnbListing(scrapy.Item):
    title = scrapy.Field()
    location = scrapy.Field()
    address = scrapy.Field()
    price_per_night = scrapy.Field()
    currency = scrapy.Field()
    total_price = scrapy.Field()
    image_urls = scrapy.Field()
    ratings = scrapy.Field()
    description = scrapy.Field()
    num_reviews = scrapy.Field()
    amenities = scrapy.Field()
    host_info = scrapy.Field()
    property_type = scrapy.Field()
