import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Listing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/listings/${id}/`
        );
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListingDetails();
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{listing.title}</h2>
      <img
        src={listing.image_urls[0]}
        className="img-fluid"
        alt={listing.title}
      />
      <p>
        <strong>Location:</strong> {listing.location}
      </p>
      <p>
        <strong>Price:</strong> ${listing.price_per_night} per night
      </p>
      <p>
        <strong>Amenities:</strong> {listing.amenities.join(", ")}
      </p>
      <button className="btn btn-danger">Book Now</button>
    </div>
  );
};

export default Listing;
