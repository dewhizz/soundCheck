import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MakePayment = () => {
    const { state } = useLocation();
    const { product } = state || {}; // Receive product details

    const [phone, setPhone] = useState(""); // M-Pesa phone number
    const [message, setMessage] = useState(""); // Message to show user
    const [selectedLocation, setSelectedLocation] = useState(""); // Pickup location
    const [deliveryFee, setDeliveryFee] = useState(0); // Delivery fee
    const [isSubmitting, setIsSubmitting] = useState(false); // For submission state
    const [formError, setFormError] = useState(""); // Form validation error message
    const [phoneError, setPhoneError] = useState(""); // Phone validation error message
    const [locationError, setLocationError] = useState(""); // Location validation error message

    if (!product) {
        return <div className="alert alert-danger">Product information is not available.</div>;
    }

    const image_url = "https://Lewis44.pythonanywhere.com/static/images/";

    const pickupLocations = [
        { name: 'Mombasa', latitude: -4.043, longitude: 39.668 },
        { name: 'Kisumu', latitude: -0.0917, longitude: 34.768 },
        { name: 'Nakuru', latitude: -0.3031, longitude: 36.066 },
        { name: 'Eldoret', latitude: 0.5186, longitude: 35.2698 },
        { name: 'Nairobi', latitude: -1.286389, longitude: 36.817223 },  // Shop location
    ];

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Returns the distance in kilometers
    };

    const toRad = (degree) => {
        return degree * (Math.PI / 180);
    };

    const handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        setSelectedLocation(selectedLocation);

        const location = pickupLocations.find(loc => loc.name === selectedLocation);
        
        if (location) {
            const distance = calculateDistance(
                pickupLocations[4].latitude, pickupLocations[4].longitude,  // Nairobi (Shop location)
                location.latitude, location.longitude
            );

            const fee = Math.max(100, Math.round(distance / 10) * 50);  // Minimum fee is 100
            setDeliveryFee(fee);
        } else {
            setLocationError("Please select a pickup location.");
        }
    };

    const isPhoneValid = (phone) => {
        const phonePattern = /^254\d{9}$/;
        return phonePattern.test(phone);
    };

    const isFormValid = () => {
        return isPhoneValid(phone) && selectedLocation;
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setFormError("Please enter a valid M-Pesa number and select a pickup location.");
            return;
        }

        setMessage("Payment is being processed, please wait...");
        setIsSubmitting(true);
        setFormError(""); // Clear any previous error

        const formdata = new FormData();
        formdata.append("phone", phone);
        formdata.append("amount", product.product_cost);
        formdata.append("delivery_fee", deliveryFee);

        try {
            const response = await axios.post("https://lewis44.pythonanywhere.com/api/mpesa_payment", formdata);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Payment error:", error);
            setMessage("An error occurred while processing your payment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneChange = (e) => {
        const phoneInput = e.target.value;
        setPhone(phoneInput);

        if (!isPhoneValid(phoneInput)) {
            setPhoneError("Please enter a valid M-Pesa phone number (start with 254xxxxxxxxx).");
        } else {
            setPhoneError("");
        }
    };

    const totalCostWithDelivery = product.product_cost + deliveryFee;

    return (
        <div className="row justify-content-center mt-4" width="300px">
            <h1 className='text bg-warning'><b>Make Payment - Lipa na Mpesa</b></h1>
            <h6 className='text-success'>{message}</h6>
            
            {formError && <div className="alert alert-danger">{formError}</div>}

            <div className="col-md-6 card shadow">
            <img
            src={image_url + product.product_photo}
            alt={product.product_name}
            className="product_img"
            style={{ width: "100%", height: "auto", objectFit: "cover" }} // Ensures image fits within the card
              />

                <h4>Product Name: {product.product_name}</h4>
                <h5>Product Description: {product.product_description}</h5>
                <b>Product Cost: Ksh.{product.product_cost}</b>

                <div className="form-group mt-4 p-3 bg-light rounded shadow-sm">
                    <label htmlFor="pickup-location" className="form-label fw-bold mb-2 text-dark">
                        📍 Choose Your Pickup Location
                    </label>
                    <select
                        id="pickup-location"
                        className="form-select border-primary"
                        onChange={handleLocationChange}
                    >
                        <option value="">-- Select a location --</option>
                        {pickupLocations.map((location, index) => (
                            <option key={index} value={location.name}>
                                {location.name} 🚚
                            </option>
                        ))}
                    </select>

                    {locationError && <div className="text-danger mt-2">{locationError}</div>}

                    {selectedLocation && (
                        <div className="mt-3">
                            <p className="mb-1">
                                <strong>Selected Location:</strong> {selectedLocation}
                            </p>
                            <p className="mb-0">
                                <strong>Estimated Delivery Fee:</strong> <span className="text-success">Ksh. {deliveryFee}</span>
                            </p>
                        </div>
                    )}
                </div>

                {selectedLocation && (
                    <div className="mt-3 bg-light p-3 rounded shadow-sm">
                        <p className="mb-1">
                            <strong>Total Cost:</strong> <span className="text-success">Ksh. {totalCostWithDelivery}</span>
                        </p>
                    </div>
                )}

                <div className="card-body">
                    <form onSubmit={submit}>
                        <input
                            type="text"
                            className='form-control text'
                            placeholder='Enter M-Pesa number (start with 254xxxxxxxxx)'
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                        {phoneError && <div className="text-danger mt-2">{phoneError}</div>}
                        <br />
                        <button
                            type='submit'
                            className='btn btn-outline-warning text-shadow p-3 w-100'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Processing..." : "Submit Payment"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakePayment;
