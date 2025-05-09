import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCalendarAlt, FaCreditCard, FaStar } from "react-icons/fa"; // Removed FaSearch
import CustomCarousel from "./Carousel";

const Getproducts = () => {
  // React hooks
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered data
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]); // Suggestions

  const navigate = useNavigate();

  // Fetch products from the API
  const getproducts = async () => {
    setLoading("Attempting to fetch the available products, please wait..................");

    try {
      const response = await axios.get('https://lewis44.pythonanywhere.com/api/getproduct');
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (!products) return; // Prevent errors if products is undefined

    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);

    if (searchQuery.length > 0) {
      const suggestions = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAutocompleteSuggestions(suggestions);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [searchQuery, products]);

  // Sort products by price (cheapest to most expensive)
  const sortByPrice = () => {
    const sorted = [...filteredProducts].sort((a, b) => parseFloat(a.product_cost) - parseFloat(b.product_cost));
    setFilteredProducts(sorted);
  };

  const img_url = 'https://lewis44.pythonanywhere.com/static/images/';

  // Helper function to format price
  const formatPrice = (price) => {
    return `Kshs ${price.toLocaleString()}`;
  };

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" color="#FFD700" style={{ opacity: 0.5 }} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} color="#D3D3D3" />);
    }
    return stars;
  };

  // Add product to cart with specified quantity
  const addToCart = (product) => {
    const quantity = prompt(`How many ${product.product_name} would you like to add to your cart?`);

    // Validate if the quantity is a positive number
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    // Convert quantity to a number
    const quantityNumber = parseInt(quantity);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = storedCart.find((item) => item.product_id === product.product_id);

    if (existingProduct) {
      // Update the quantity if the product already exists in the cart
      existingProduct.quantity += quantityNumber;
    } else {
      // Add the product with the specified quantity to the cart
      product.quantity = quantityNumber;
      storedCart.push(product);
    }

    // Update localStorage with the new cart
    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert(`${quantityNumber} of ${product.product_name} has been added to your cart!`);
  };

  // Handle Rent Now: Collect user info and navigate to confirmation
  const handleRentNow = (product) => {
    // Show a prompt to collect user's email, phone, and rental days
    const email = prompt("Enter your email address:");
    const phone = prompt("Enter your phone number:");
    const rentalDays = parseInt(prompt("Enter number of rental days:"));

    // Validate the inputs
    if (!email || !phone || isNaN(rentalDays) || rentalDays <= 0) {
      alert("Please provide valid information.");
      return;
    }

    // Navigate to the RentConfirmation component with necessary data
    navigate('/rentconfirmation', {
      state: {
        product,
        rentalCost: product.product_cost,
        rentalDays,
        email,
        phone,
      },
    });
  };

  return (
    <div className="container">
      <CustomCarousel />

      <h1 className="text-center my-4">Available Products</h1>

      {/* Search Bar and Sort by Price */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="position-relative">
            <input
              type="text"
              className="form-control shadow-sm p-3"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {autocompleteSuggestions.length > 0 && (
              <ul className="autocomplete-suggestions shadow-lg rounded">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => setSearchQuery(suggestion.product_name)}
                  >
                    {suggestion.product_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <button className="btn btn-outline-primary w-100" onClick={sortByPrice}>
            Sort by Price: Low to High
          </button>
        </div>
      </div>

      {/* Display loading, error, or products */}
      {loading && <div className="text-center">{loading}</div>}
      {error && <div className="text-danger text-center">{error}</div>}

      {/* Render filtered and sorted products */}
      {filteredProducts.length === 0 && !loading && !error && (
        <div className="text-center">No products found matching your search.</div>
      )}
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-lg rounded overflow-hidden" style={{ border: '2px solid #FFD700' }}>
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="card-img-top"
                height="250"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text text-muted">{product.product_description.slice(0, 60)}...</p>
                <b className="text-warning d-block mb-2">{formatPrice(product.product_cost)}</b>

                {/* Product Rating */}
                {product.rating && (
                  <div className="mb-3">
                    <span>{renderStars(product.rating)}</span>
                    <span className="ml-2">{product.rating.toFixed(1)} / 5</span>
                  </div>
                )}

                <button className="btn btn-dark w-100 mb-3" onClick={() => addToCart(product)}>
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>

                <button
                  className="btn btn-warning w-100 mb-3"
                  onClick={() => handleRentNow(product)}
                >
                  <FaCalendarAlt className="mr-2" /> Rent Now
                </button>

                <button
                  className="btn btn-success w-100"
                  onClick={() => navigate('/makepayment', { state: { product } })}
                >
                  <FaCreditCard className="mr-2" /> Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproducts;
