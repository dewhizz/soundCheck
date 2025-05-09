import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapPin, FaStar } from 'react-icons/fa'; // For Location Pin and Star Icons

const RentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Declare all hooks at the top
  const [showMpesaPopup, setShowMpesaPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isDelivery, setIsDelivery] = useState(true); // New state to track delivery option

  // Destructure data passed from Getproducts component
  const { product, rentalCost, rentalDays, email, phone } = location.state || {};

  // Handle when data is missing
  if (!product || !rentalCost || !rentalDays || !email || !phone) {
    return <div className="text-center">Error: Missing data.</div>;
  }

  // Delivery Locations (distance in km from Nairobi)
  const deliveryLocations = {
    Nairobi: 0,
    Mombasa: 480,
    Kisumu: 350,
    Nakuru: 160,
    Eldoret: 310,
    Meru: 225,
    Nyeri: 150,
    Nanyuki: 180,
    Thika: 40,
    Kakamega: 350,
  };

  // Handle delivery calculation
  const calculateDelivery = (location) => {
    if (!deliveryLocations[location]) {
      alert("Please select a valid delivery location.");
      return;
    }

    const distanceFromNairobi = deliveryLocations[location];
    
    // Delivery fee logic (Ksh 50 per 10 km)
    const fee = (Math.ceil(distanceFromNairobi / 10)) * 50;
    setDeliveryDistance(distanceFromNairobi);
    setDeliveryFee(fee);
  };

  // Simulate M-Pesa payment success
  const handleMpesaPayment = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
      setShowMpesaPopup(false);
    }, 3000); // Simulate payment processing time
  };

  const totalCost = parseFloat(rentalCost) + (isDelivery ? deliveryFee : 0); // Include delivery fee only if delivery is selected

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
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

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: '#007BFF' }}>Thank You for Renting!</h1>
      <p className="text-center">We have successfully processed your rental. Here are your rental details:</p>

      <div className="card p-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="text-center">
          <img
            src={`https://lewis44.pythonanywhere.com/static/images/${product.product_photo}`}
            alt={product.product_name}
            className="img-fluid mb-3"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>
        <h4>Product Name: <span style={{ color: '#28a745' }}>{product?.product_name}</span></h4>
        <p>Description: {product?.product_description}</p>
        <p>Rental Duration: {rentalDays} day(s)</p>
        <p>Total Rental Cost: <strong style={{ color: '#FF5722' }}>Ksh {formatNumber(rentalCost)}</strong></p>

        {/* Product Rating */}
        {product.rating && (
          <div className="mt-3">
            <h5>Product Rating</h5>
            <div>
              <span>{renderStars(product.rating)}</span>
              <span className="ml-2">{product.rating.toFixed(1)} / 5</span>
            </div>
          </div>
        )}

        {/* Display user information */}
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>

        {/* Delivery Section */}
        <div className="mt-3">
          <h5>Delivery Details</h5>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="deliveryOption"
              name="deliveryOption"
              checked={isDelivery}
              onChange={() => setIsDelivery(true)} // User wants delivery
            />
            <label className="form-check-label" htmlFor="deliveryOption">
              I want the product delivered to me.
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="pickupOption"
              name="deliveryOption"
              checked={!isDelivery}
              onChange={() => setIsDelivery(false)} // User will pick up the product
            />
            <label className="form-check-label" htmlFor="pickupOption">
              I will pick up the product myself (No Delivery Fee).
            </label>
          </div>

          {isDelivery && (
            <div className="d-flex align-items-center mt-3">
              <FaMapPin size={20} className="mr-2" />
              <select
                className="form-control"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
              >
                <option value="">Select Delivery Location</option>
                {Object.keys(deliveryLocations).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isDelivery && (
            <>
              <button
                className="btn btn-info w-100 mt-2"
                onClick={() => calculateDelivery(deliveryLocation)}
                disabled={!deliveryLocation}
              >
                Calculate Delivery Fee
              </button>

              {deliveryLocation && (
                <div className="mt-3">
                  <p><strong>Distance from Nairobi:</strong> {deliveryDistance} km</p>
                  <p><strong>Delivery Fee:</strong> <span style={{ color: '#FF5722' }}>Ksh {formatNumber(deliveryFee)}</span></p>
                </div>
              )}
            </>
          )}

          <h5 className="mt-3"><strong>Total Rental + Delivery Cost: <span style={{ color: '#FF5722' }}>Ksh {formatNumber(totalCost)}</span></strong></h5>
        </div>

        <p>We hope you enjoy using the product! Please proceed with payment via M-Pesa.</p>

        <button
          className="btn btn-success w-100 mt-4"
          onClick={() => setShowMpesaPopup(true)}
          disabled={isDelivery && !deliveryLocation} // Disable only if delivery is selected and no location is chosen
        >
          Proceed with M-Pesa Payment
        </button>
      </div>

      {/* M-Pesa Payment Popup */}
      {showMpesaPopup && (
        <div className="mpesa-popup-overlay">
          <div className="mpesa-popup">
            <h4>Complete Your Payment via M-Pesa</h4>
            <p><strong>Amount: </strong>Ksh {formatNumber(totalCost)}</p>
            <p><strong>Phone Number: </strong>{phone}</p>
            <p>Please enter your M-Pesa PIN to complete the payment.</p>

            <input
              type="password"
              placeholder="Enter M-Pesa PIN"
              className="form-control mb-3"
            />

            <button
              className="btn btn-primary w-100"
              onClick={handleMpesaPayment}
            >
              Pay Now
            </button>

            <button
              className="btn btn-danger w-100 mt-2"
              onClick={() => setShowMpesaPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Show Payment Success */}
      {paymentSuccess && (
        <div className="alert alert-success mt-4">
          <h5 style={{ color: '#28a745' }}>Payment Successful!</h5>
          <p>Your payment has been processed successfully via M-Pesa.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/home')}
          >
            Go Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default RentConfirmation;
