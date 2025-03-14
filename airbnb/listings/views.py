from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Listing
from .serializers import ListingSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def get_listings(request):
    """Fetch all Airbnb listings from the database"""
    listings = Listing.objects.all()
    serializer = ListingSerializer(listings, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_listing(request):
    """Add a new Airbnb listing to the database"""
    serializer = ListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
