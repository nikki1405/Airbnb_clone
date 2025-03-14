from django.db import models

# Create your models here.
from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    address = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    image_urls = models.JSONField(default=list)
    ratings = models.FloatField()
    description = models.TextField()
    num_reviews = models.IntegerField()
    amenities = models.JSONField(default=list)
    host_info = models.JSONField(default=dict)
    property_type = models.CharField(max_length=50)

    def __str__(self):
        return self.title
