import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  "Farms",
  "Icons",
  "Rooms",
  "Amazing pools",
  "Lake",
  "Surfing",
  "Amazing views",
  "Countryside",
  "Beachfront",
  "Luxe",
];

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/listings/") // Change to your actual backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        return response.json();
      })
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="py-3 shadow-sm">
        <Navbar.Brand href="#">
          <span className="text-danger fw-bold">airbnb</span>
        </Navbar.Brand>
        <Form className="d-flex mx-auto w-50">
          <Form.Control
            type="search"
            placeholder="Search destinations"
            className="me-2"
          />
          <Button variant="danger">
            <FaSearch />
          </Button>
        </Form>
        <Nav>
          <Nav.Link href="#">
            <FaUserCircle size={24} />
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* Category Filter */}
      <div className="d-flex justify-content-around my-3">
        {categories.map((category, index) => (
          <div key={index} className="text-center px-3">
            <span className="fw-bold">{category}</span>
          </div>
        ))}
      </div>

      {/* Loading and Error Handling */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="danger" />
          <p>Loading listings...</p>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Listings */}
      <Row>
        {listings.map((listing, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={listing.image_urls[0] || "https://via.placeholder.com/300"}
              />
              <Card.Body>
                <Card.Title>{listing.location}</Card.Title>
                <Card.Text>
                  <small>
                    {listing.address} | {listing.property_type}
                  </small>
                  <br />
                  <strong>
                    {listing.currency} {listing.price_per_night} / night
                  </strong>
                </Card.Text>
                <span>
                  ⭐ {listing.ratings} ({listing.num_reviews} reviews)
                </span>
                <FaHeart className="float-end text-danger" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
