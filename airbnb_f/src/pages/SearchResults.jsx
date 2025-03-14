import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const location = searchParams.get("location") || "";
        const response = await axios.get(
          `http://127.0.0.1:8000/api/listings/?location=${location}`
        );
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [searchParams]);

  return (
    <div className="container">
      <h2>Search Results</h2>
      <div className="row">
        {listings.map((listing) => (
          <div key={listing.id} className="col-md-4">
            <div className="card">
              <img
                src={listing.image_urls[0]}
                className="card-img-top"
                alt={listing.title}
              />
              <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <p>{listing.location}</p>
                <p>${listing.price_per_night} per night</p>
                <a href={`/listing/${listing.id}`} className="btn btn-primary">
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
